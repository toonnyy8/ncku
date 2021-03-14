///<reference path="../src/gltf.js">
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
                        ),
                        gl.STATIC_DRAW,
                    )
                    gl.vertexAttribPointer(
                        loc,
                        1,
                        accessor.componentType,
                        false,
                        bufferView["byteStride"] || 0,
                        accessor["byteOffset"] || 0
                    )
                    return { loc, type: accessor.type.toLowerCase(), attribute: attribute.toLowerCase() }
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
                    ),
                    gl.STATIC_DRAW,
                )
            }
            gl.bindVertexArray(null)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)


            let vs_in = shader_info.map(({ loc, type, attribute }) => {
                return `layout (location = ${loc}) in ${type} a_${attribute};\n`
            })
            let vs_out = shader_info.map(({ loc, type, attribute }) => {
                return `out ${type} v_${attribute};\n`
            })
            let vs_assign = shader_info.map(({ loc, type, attribute }) => {
                return `v_${attribute} = a_${attribute};\n`
            })

            console.log(vs_in)
            console.log(vs_out)
            console.log(vs_assign)
            let fs_in = shader_info.map(({ loc, type, attribute }) => {
                return `in ${type} v_${attribute};\n`
            })
            console.log(fs_in)

            {
                this.gl = gl
                this.vao = vao
                const accessor = doc.accessors[primitive.indices]
                this.count = accessor.count
                this.mode = primitive["mode"] || gl.TRIANGLES
                this.type = accessor.componentType
                this.program = null
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
            let loc = gl.getUniformLocation(this.program, "u_mvp");
            gl.uniformMatrix4fv(loc, false, mvp)
            gl.bindVertexArray(this.vao)
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