///<reference path="../src/gltf.js">
///<reference path="../src/shader.js">
///<reference path="../src/gl-matrix.js">
const glUnit = (() => {
    class GltfDoc extends gltf.types.Doc { }

    class Primitive {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         * @param {HTMLImageElement[]} imgs
         */
        constructor(gl, doc, bin, imgs) {
            const mesh = doc.meshes[0]
            const primitive = mesh.primitives[0]

            const vao = gl.createVertexArray()
            gl.bindVertexArray(vao)
            let shader_info = Object
                .keys(primitive.attributes)
                .map((attribute, loc) => {
                    const accessor = doc.accessors[primitive.attributes[attribute]]
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
                const accessor = doc.accessors[primitive.indices]
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
                `out vec4 v_color;\n` +
                `void main(void) {\n` +
                `   v_color = vec4(1.0, 0.0, 0.0, 1.0);\n` +
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
                `in vec4 v_color;\n` +
                fs_in.reduce((prev, curr) => prev + curr, ``) +
                `out vec4 f_color;\n` +
                `uniform sampler2D u_texture;\n` +
                `void main(void) {\n` +
                // `   f_color = v_color;\n` +
                `   f_color =  texture(u_texture, v_texcoord_0);\n` +
                `}\n`
            console.log(fs_source)

            {
                this.gl = gl
                this.vao = vao
                const accessor = doc.accessors[primitive.indices]
                this.count = accessor.count
                this.mode = primitive["mode"] || gl.TRIANGLES
                this.type = accessor.componentType
                this.program = shader.createProgram(gl, vs_source, fs_source)
                this.vbo = shader_info.map(({ vbo }) => vbo)
            }
        }
        /**
         * 
         * @param {Float32Array} mvp
         * @param {WebGLTexture[]} textures
         */
        draw(mvp, textures) {
            const gl = this.gl
            gl.useProgram(this.program)
            // var u_image0Location = gl.getUniformLocation(this.program, "u_texture");
            // console.log(u_image0Location)
            // gl.uniform1i(u_image0Location, 0);
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, textures[0])
            gl.bindVertexArray(this.vao)
            let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp");
            console.log(u_mvp_loc)
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
    }


    return {
        /**
         *
         * @param {WebGL2RenderingContext} gl
         * @param {GltfDoc} doc
         * @param {Uint8Array} bin
         */
        primitive: (gl, doc, bin) => new Primitive(gl, doc, bin)
    }
})()