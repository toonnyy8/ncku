///<reference path="../src/gltf.js">
///<reference path="../src/shader.js">
///<reference path="../src/gl-matrix.js">
import * as gltf from "./gltf"
import * as shader from "./shader"
import * as glm from "gl-matrix"

class Primitive {
    constructor(
        gl: WebGL2RenderingContext,
        primitiveInfo: gltf.Primitive,
        doc: gltf.Doc,
        bin: Uint8Array,
        textures: WebGLTexture[]
    ) {
        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)
        let shader_info = Object.keys(primitiveInfo.attributes).map((attribute, loc) => {
            const accessor = doc.accessors[primitiveInfo.attributes[attribute]]
            const bufferView = doc.bufferViews[accessor.bufferView]

            gl.enableVertexAttribArray(loc)
            const vbo = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
            gl.bufferData(
                gl.ARRAY_BUFFER,
                bin.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength)
                    .buffer,
                gl.STATIC_DRAW
            )
            let size = (() => {
                switch (accessor.type) {
                    case "SCALAR":
                        return 1
                    case "VEC2":
                        return 2
                    case "VEC3":
                        return 3
                    case "VEC4":
                        return 4
                }
            })()
            gl.vertexAttribPointer(
                loc,
                size,
                accessor.componentType,
                false,
                bufferView["byteStride"] || 0,
                accessor["byteOffset"] || 0
            )
            return {
                loc,
                type: accessor.type.toLowerCase(),
                attribute: attribute.toLowerCase(),
                vbo,
            }
        })
        if (primitiveInfo.indices != undefined) {
            const accessor = doc.accessors[primitiveInfo.indices]
            const bufferView = doc.bufferViews[accessor.bufferView]
            const ebo = gl.createBuffer()
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                bin.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength)
                    .buffer,
                gl.STATIC_DRAW
            )

            this.count = accessor.count
            this.type = accessor.componentType
        } else {
            const accessor = doc.accessors[primitiveInfo.attributes.POSITION]
            this.count = accessor.count
        }

        {
            this.gl = gl
            this.vao = vao
            this.mode = primitiveInfo["mode"] || gl.TRIANGLES
            const baseColorTexture =
                doc.materials[primitiveInfo.material].pbrMetallicRoughness["baseColorTexture"]
            if (baseColorTexture != undefined) {
                this.baseColorTexture = textures[baseColorTexture.index]
            }
            const baseColorFactor =
                doc.materials[primitiveInfo.material].pbrMetallicRoughness["baseColorFactor"]
            if (baseColorFactor != undefined) {
                this.baseColorFactor = baseColorFactor
            } else {
                this.baseColorFactor = [0, 0, 0, 0]
            }
        }

        let vs_in = shader_info.map(({ loc, type, attribute }) => {
            return `layout (location = ${loc}) in ${type} a_${attribute};\n`
        })
        let vs_out = shader_info.map(({ loc, type, attribute }) => {
            return `out ${type} v_${attribute};\n`
        })
        let vs_assign = shader_info.map(({ loc, type, attribute }) => {
            return `v_${attribute} = a_${attribute};\n`
        })
        let vs_source =
            `#version 300 es\n` +
            `uniform mat4 u_mvp;\n` +
            vs_in.reduce((prev, curr) => prev + curr, ``) +
            vs_out.reduce((prev, curr) => prev + curr, ``) +
            `void main(void) {\n` +
            vs_assign.reduce((prev, curr) => prev + `   ` + curr, ``) +
            `   gl_Position = u_mvp * vec4(a_position, 1.0);\n` +
            `}\n`

        console.log(vs_source)
        let fs_in = shader_info.map(({ loc, type, attribute }) => {
            return `in ${type} v_${attribute};\n`
        })
        let fs_source =
            `#version 300 es\n` +
            `precision mediump float;\n` +
            fs_in.reduce((prev, curr) => prev + curr, ``) +
            `out vec4 f_color;\n` +
            `uniform sampler2D u_texture;\n` +
            `uniform vec4 u_basecolor;\n` +
            // `uniform int u_useTexture;\n` +
            `void main(void) {\n` +
            (() => {
                let s = ""
                if (this.baseColorTexture != undefined) {
                    s =
                        `   vec4 texcolor = texture(u_texture, v_texcoord_0);\n` +
                        `   f_color.a = texcolor.a + u_basecolor.a * (1.0 - texcolor.a);\n` +
                        `   if (f_color.a == 0.) { f_color.rgb = vec3(0., 0., 0.); }\n` +
                        `   else { f_color.rgb = texcolor.rgb * texcolor.a + u_basecolor.rgb * u_basecolor.a * (1. - texcolor.a); };\n`
                } else {
                    s = `   f_color = u_basecolor;\n`
                }
                return s
            })() +
            `}\n`
        console.log(fs_source)

        {
            this.program = shader.createProgram(gl, vs_source, fs_source)
        }
    }
    draw(mvp: glm.mat4) {
        const gl = this.gl
        gl.useProgram(this.program)

        // let u_useTextureLocation = gl.getUniformLocation(this.program, "u_useTexture");
        // if (this.baseColorTexture == undefined) {
        //     gl.uniform1i(u_useTextureLocation, 0)
        // } else {
        //     gl.uniform1i(u_useTextureLocation, 1)
        // }

        let u_basecolorLocation = gl.getUniformLocation(this.program, "u_basecolor")
        gl.uniform4fv(u_basecolorLocation, this.baseColorFactor)

        let u_textureLocation = gl.getUniformLocation(this.program, "u_texture")
        gl.uniform1i(u_textureLocation, 0)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.baseColorTexture)
        gl.bindVertexArray(this.vao)

        let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp")
        gl.uniformMatrix4fv(u_mvp_loc, false, mvp)

        if (this.type != undefined) gl.drawElements(this.mode, this.count, this.type, 0)
        else gl.drawArrays(this.mode, 0, this.count)
        gl.bindVertexArray(null)
    }
    drawAnim(mvp: glm.mat4) {
        const gl = this.gl
        gl.useProgram(this.program)

        // let u_useTextureLocation = gl.getUniformLocation(this.program, "u_useTexture");
        // if (this.baseColorTexture == undefined) {
        //     gl.uniform1i(u_useTextureLocation, 0)
        // } else {
        //     gl.uniform1i(u_useTextureLocation, 1)
        // }

        let u_basecolorLocation = gl.getUniformLocation(this.program, "u_basecolor")
        gl.uniform4fv(u_basecolorLocation, this.baseColorFactor)

        let u_textureLocation = gl.getUniformLocation(this.program, "u_texture")
        gl.uniform1i(u_textureLocation, 0)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.baseColorTexture)
        gl.bindVertexArray(this.vao)

        let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp")
        gl.uniformMatrix4fv(u_mvp_loc, false, mvp)

        if (this.type != undefined) gl.drawElements(this.mode, this.count, this.type, 0)
        else gl.drawArrays(this.mode, 0, this.count)
        gl.bindVertexArray(null)
    }

    gl: WebGL2RenderingContext
    vao: WebGLVertexArrayObject
    program: WebGLProgram
    count: number
    mode: number
    type?: number
    baseColorTexture: WebGLTexture
    baseColorFactor: [number, number, number, number]
}

class Mesh {
    constructor(
        gl: WebGL2RenderingContext,
        meshInfo: gltf.Mesh,
        doc: gltf.Doc,
        bin: Uint8Array,
        textures: WebGLTexture[]
    ) {
        this.primitives = meshInfo.primitives.map((primitiveInfo) => {
            return new Primitive(gl, primitiveInfo, doc, bin, textures)
        })
    }

    draw(mvp: glm.mat4) {
        this.primitives.forEach((primitive) => primitive.draw(mvp))
    }
    primitives: Primitive[]
}

class Node {
    constructor(
        gl: WebGL2RenderingContext,
        nodeInfo: gltf.Node,
        doc: gltf.Doc,
        bin: Uint8Array,
        textures: WebGLTexture[]
    ) {
        this.mat = glm.mat4.fromRotationTranslationScale(
            glm.mat4.create(),
            nodeInfo["rotation"] || [0, 0, 0, 0],
            nodeInfo["translation"] || [0, 0, 0],
            nodeInfo["scale"] || [1, 1, 1]
        )
        if (nodeInfo["mesh"] != undefined) {
            this.mesh = new Mesh(gl, doc.meshes[nodeInfo["mesh"]], doc, bin, textures)
        }
        this.children = (nodeInfo["children"] || []).map((childIdx) => {
            return new Node(gl, doc.nodes[childIdx], doc, bin, textures)
        })
    }

    draw(p: glm.mat4) {
        let mvp = glm.mat4.multiply(glm.mat4.create(), p, this.mat)
        if (this.mesh != undefined) {
            this.mesh.draw(mvp)
        }
        this.children.forEach((child) => child.draw(mvp))
    }

    children: Node[]
    mesh: Mesh
    mat: glm.mat4
}

class Scene {
    constructor(
        gl: WebGL2RenderingContext,
        sceneInfo: gltf.Scene,
        doc: gltf.Doc,
        bin: Uint8Array,
        textures: WebGLTexture[]
    ) {
        this.nodes = sceneInfo.nodes.map((nodeIdx) => {
            return new Node(gl, doc.nodes[nodeIdx], doc, bin, textures)
        })
    }
    draw(p: glm.mat4) {
        this.nodes.forEach((node) => node.draw(p))
    }

    nodes: Node[]
}

export const primitive = (
    gl: WebGL2RenderingContext,
    primitiveInfo: gltf.Primitive,
    doc: gltf.Doc,
    bin: Uint8Array,
    textures: WebGLTexture[]
) => new Primitive(gl, primitiveInfo, doc, bin, textures)

export const mesh = (
    gl: WebGL2RenderingContext,
    meshInfo: gltf.Mesh,
    doc: gltf.Doc,
    bin: Uint8Array,
    textures: WebGLTexture[]
) => new Mesh(gl, meshInfo, doc, bin, textures)

export const node = (
    gl: WebGL2RenderingContext,
    nodeInfo: gltf.Node,
    doc: gltf.Doc,
    bin: Uint8Array,
    textures: WebGLTexture[]
) => new Node(gl, nodeInfo, doc, bin, textures)

export const scene = (
    gl: WebGL2RenderingContext,
    sceneInfo: gltf.Scene,
    doc: gltf.Doc,
    bin: Uint8Array,
    textures: WebGLTexture[]
) => new Scene(gl, sceneInfo, doc, bin, textures)
