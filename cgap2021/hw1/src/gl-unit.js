///<reference path="../src/gltf.js">
///<reference path="../src/shader.js">
///<reference path="../src/gl-matrix.js">
const glUnit = (() => {
    class GltfDoc extends gltf.types.Doc { }
    class GltfPrimitive extends gltf.types.Primitive { }
    class GltfMesh extends gltf.types.Mesh { }
    class GltfNode extends gltf.types.Node { }
    class GltfScene extends gltf.types.Scene { }

    class Primitive {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfPrimitive} primitiveInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        constructor(gl, primitiveInfo, doc, bin, textures) {

            const vao = gl.createVertexArray()
            gl.bindVertexArray(vao)
            let shader_info = Object
                .keys(primitiveInfo.attributes)
                .map((attribute, loc) => {
                    const accessor = doc.accessors[primitiveInfo.attributes[attribute]]
                    const bufferView = doc.bufferViews[accessor.bufferView];

                    gl.enableVertexAttribArray(loc)
                    const vbo = gl.createBuffer()
                    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
                    gl.bufferData(
                        gl.ARRAY_BUFFER,
                        bin.slice(
                            bufferView.byteOffset,
                            bufferView.byteOffset + bufferView.byteLength
                        ).buffer,
                        gl.STATIC_DRAW,
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
                    return { loc, type: accessor.type.toLowerCase(), attribute: attribute.toLowerCase(), vbo }
                })
            {
                const accessor = doc.accessors[primitiveInfo.indices]
                const bufferView = doc.bufferViews[accessor.bufferView]
                const ebo = gl.createBuffer()
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
                gl.bufferData(
                    gl.ELEMENT_ARRAY_BUFFER,
                    bin.slice(
                        bufferView.byteOffset,
                        bufferView.byteOffset + bufferView.byteLength
                    ).buffer,
                    gl.STATIC_DRAW,
                )
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
                // `precision mediump float;\n` +
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
                `void main(void) {\n` +
                // `   vec4 texcolor = vec4(0.,0.,0.,0.); \n` +
                // `   vec4 texcolor = texture(u_texture, v_texcoord_0); \n` +
                // `   f_color.a = texcolor.a + u_basecolor.a * (1.0 - texcolor.a); \n` +
                // `   if (f_color.a == 0.) { f_color.rgb = vec3(0., 0., 0.); } \n` +
                // `   else { f_color.rgb = texcolor.rgb * texcolor.a + u_basecolor.rgb * u_basecolor.a * (1. - texcolor.a); }; \n` +
                `   f_color = texture(u_texture, v_texcoord_0);\n` +
                `}\n`
            console.log(fs_source)

            {
                this.gl = gl
                this.vao = vao
                const accessor = doc.accessors[primitiveInfo.indices]
                this.count = accessor.count
                this.mode = primitiveInfo["mode"] || gl.TRIANGLES
                this.type = accessor.componentType
                this.program = shader.createProgram(gl, vs_source, fs_source)
                this.vbo = shader_info.map(({ vbo }) => vbo)
                const baseColorTexture = doc.materials[primitiveInfo.material]
                    .pbrMetallicRoughness["baseColorTexture"]
                if (baseColorTexture != undefined) {
                    this.baseColorTexture = textures[baseColorTexture.index]
                }
            }
        }
        /**
         * 
         * @param {Float32Array} mvp
         */
        draw(mvp) {
            const gl = this.gl
            gl.useProgram(this.program)
            var u_basecolorLocation = gl.getUniformLocation(this.program, "u_basecolor");
            gl.uniform4fv(u_basecolorLocation, [0, 0, 0, 0])

            var u_textureLocation = gl.getUniformLocation(this.program, "u_texture");
            gl.uniform1i(u_textureLocation, 0)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, this.baseColorTexture)
            gl.bindVertexArray(this.vao)

            let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp");
            gl.uniformMatrix4fv(u_mvp_loc, false, mvp)

            gl.drawElements(this.mode, this.count, this.type, 0)
            gl.bindVertexArray(null)
        }

        /**
         * @type {WebGL2RenderingContext}
         */
        gl
        /**
         * @type {WebGLVertexArrayObject}
         */
        vao
        /**
         * @type {WebGLProgram}
         */
        program
        /**
         * @type {number}
         */
        count
        /**
         * @type {number}
         */
        mode
        /**
         * @type {number}
         */
        type
        /**
         * @type {WebGLTexture}
         */
        baseColorTexture
    }

    class Mesh {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfMesh} meshInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        constructor(gl, meshInfo, doc, bin, textures) {
            this.primitives = meshInfo.primitives.map((primitiveInfo) => {
                return new Primitive(gl, primitiveInfo, doc, bin, textures)
            })
        }
        /**
         * 
         * @param {Float32Array} mvp
         */
        draw(mvp) {
            this.primitives
                .forEach(primitive => primitive.draw(mvp))
        }
        /**
         * @type {Primitive[]}
         */
        primitives
    }

    class Node {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfNode} nodeInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        constructor(gl, nodeInfo, doc, bin, textures) {
            this.mat = glMatrix.mat4.fromRotationTranslationScale(
                glMatrix.mat4.create(),
                nodeInfo["rotation"] || [0, 0, 0, 0,],
                nodeInfo["translation"] || [0, 0, 0,],
                nodeInfo["scale"] || [1, 1, 1,],
            )
            if (nodeInfo["mesh"] != undefined) {
                this.mesh = new Mesh(
                    gl,
                    doc.meshes[nodeInfo["mesh"]],
                    doc,
                    bin,
                    textures,
                )
            }
            this.children = (nodeInfo["children"] || [])
                .map(childIdx => {
                    return new Node(
                        gl,
                        doc.nodes[childIdx],
                        doc,
                        bin,
                        textures,
                    )
                })
        }
        /**
         *
         * @param {Float32Array} p
         */
        draw(p) {
            let mvp = glMatrix.mat4.multiply(
                glMatrix.mat4.create(),
                p,
                this.mat,
            )
            if (this.mesh != undefined) {
                this.mesh.draw(mvp)
            }
            this.children.forEach(child => child.draw(mvp))
        }
        /**
         * @type {Node[]}
         */
        children
        /**
         * @type {Mesh}
         */
        mesh
        /**
         * @type {Float32Array}
         */
        mat
    }

    class Scene {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfScene} sceneInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        constructor(gl, sceneInfo, doc, bin, textures) {
            this.nodes = sceneInfo.nodes
                .map(nodeIdx => {
                    return new Node(
                        gl,
                        doc.nodes[nodeIdx],
                        doc,
                        bin,
                        textures,
                    )
                })
        }
        /**
         *
         * @param {Float32Array} p
         */
        draw(p) {
            this.nodes.forEach(node => node.draw(p))
        }

        /**
         * @type {Node[]}
         */
        nodes
    }
    return {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfPrimitive} primitiveInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        primitive: (gl, primitiveInfo, doc, bin, textures) => new Primitive(gl, primitiveInfo, doc, bin, textures),
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfMesh} meshInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        mesh: (gl, meshInfo, doc, bin, textures) => new Mesh(gl, meshInfo, doc, bin, textures),
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfNode} nodeInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        node: (gl, nodeInfo, doc, bin, textures) => new Node(gl, nodeInfo, doc, bin, textures),
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfScene} sceneInfo
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {WebGLTexture[]} textures
         */
        scene: (gl, sceneInfo, doc, bin, textures) => new Scene(gl, sceneInfo, doc, bin, textures)


    }
})()