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

            const texture = gl.createTexture()
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
            gl.generateMipmap(gl.TEXTURE_2D)


            const primitive = mesh.primitives[0]
            const baseColorTexture = doc
                .materials[primitive.material]
                .pbrMetallicRoughness
                .baseColorTexture
            const texCoordIdx = baseColorTexture.texCoord
            gl.activeTexture(gl.TEXTURE0 + texCoordIdx)
            const texIdx = baseColorTexture
                .index
            const tex = doc.textures[texIdx]

            const sampler = doc.samplers[tex.sampler]

            if (sampler["magFilter"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, sampler["magFilter"])
            }
            if (sampler["minFilter"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, sampler["minFilter"])
            }
            if (sampler["wrapS"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, sampler["wrapS"])
            }
            if (sampler["wrapR"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_R, sampler["wrapR"])
            }
            if (sampler["wrapT"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, sampler["wrapT"])
            }

            const vao = gl.createVertexArray()
            gl.bindVertexArray(vao)
            Object
                .keys(primitive.attributes)
                .forEach((attribute, loc) => {
                    const accessor = doc.accessors[primitive.attributes[attribute]]
                    const bufferView = doc.bufferViews[accessor.bufferView]

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