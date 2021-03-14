const gltf = (() => {
    /**
     * @param {Uint8Array} glbBytes
     */
    const asModel = async (glbBytes) => {
        /**
         * @type {Doc}
         */
        let doc = null;
        /**
         * @type {Uint8Array}
         */
        let bin = null;
        let offset = 12;

        for (let i = 0;offset < glbBytes.length;i++) {
            const len = glbBytes
                .slice(offset, offset + 4)
                .reduce((prev, curr, idx) => {
                    return prev + curr * 256 ** idx;
                }, 0)
            const type = String.fromCharCode(
                ...glbBytes.slice(offset + 4, offset + 8)
            )
            const data = glbBytes.slice(offset + 8, offset + 8 + len)
            switch (type) {
                case "BIN\u0000": {
                    bin = data
                    break
                }
                case "JSON": {
                    doc = JSON.parse(String.fromCharCode(...data))
                    break
                }
                default: {
                    console.error(`chunk type : ${type} is not defined`);
                }
            }
            offset += 8 + len;
        }
        /**
         * @type {HTMLImageElement[]}
         */
        let imgs = []
        const images = doc.images || []
        for (let image of images) {
            /**
             * @type {HTMLImageElement}
             */
            let img = await new Promise((resolve, reject) => {
                const bufferView = doc.bufferViews[image.bufferView]

                let imgBlob = new Blob(
                    [bin.slice(
                        bufferView.byteOffset,
                        bufferView.byteOffset + bufferView.byteLength
                    )],
                    { type: image.mimeType, },
                )
                let imgUrl = URL.createObjectURL(imgBlob)
                let img = new Image()
                img.onload = () => resolve(img)
                img.src = imgUrl
            });
            imgs.push(img)
        }
        return { doc, bin, imgs };
    }

    /**
     * @param {ArrayBuffer} bytes
     */
    const importFromArrayBuffer = (bytes) => {
        console.log(String.fromCharCode(...new Uint8Array(bytes.slice(0, 4))))
        console.log(`ver.${new Uint32Array(bytes.slice(4, 8))[0]}`)
        console.log(`Bytes : ${new Uint32Array(bytes.slice(8, 12))[0]}`)

        return asModel(new Uint8Array(bytes))
    }


    /**
     *
     * @param {WebGL2RenderingContext} gl
     * @param {Doc} doc
     * @param {HTMLImageElement[]} imgs
     */
    const createTexture = (gl, doc, imgs) => {
        return (doc.textures || []).map(texInfo => {
            const texture = gl.createTexture()
            gl.bindTexture(gl.TEXTURE_2D, texture)
            const sampler = doc.samplers[texInfo.sampler]
            if (sampler["magFilter"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, sampler["magFilter"])
            }
            if (sampler["minFilter"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, sampler["minFilter"])
            }
            if (sampler["wrapS"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, sampler["wrapS"])
            }
            if (sampler["wrapT"] != undefined) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, sampler["wrapT"])
            }
            const img = imgs[texInfo.source]

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                img,
            )

            return texture
        })
    }

    /**
     * 
     * @param {Primitive} primitive
     * @param {Accessor[]} accessors
     */
    const createShader = (primitive, accessors) => {
        let vertexShader =
            "#version 300 es\n" +
            Object
                .keys(primitive.attributes)
                .reduce((shader, attribute, location) => {
                    let idx = primitive.attributes[attribute]
                    let type = accessors[idx].type.toLowerCase()
                    return shader + `layout (location = ${location}) in ${type} a_${attribute.toLowerCase()};\n`
                }, "") +
            Object
                .keys(primitive.attributes)
                .reduce((shader, attribute) => {
                    let idx = primitive.attributes[attribute]
                    let type = accessors[idx].type.toLowerCase()
                    return shader + `out ${type} v_${attribute};\n`
                }, "") +
            "void main() {\n" +
            Object
                .keys(primitive.attributes)
                .reduce((shader, attribute) => {
                    return shader + `v_${attribute} = a_${attribute};\n`
                }, "") +
            "   // mat4 skinMatrix =" +
            "   //     a_weight.x * u_jointMatrix[int(a_joint.x)] +\n" +
            "   //     a_weight.y * u_jointMatrix[int(a_joint.y)] +\n" +
            "   //     a_weight.z * u_jointMatrix[int(a_joint.z)] +\n" +
            "   //     a_weight.w * u_jointMatrix[int(a_joint.w)];\n" +
            "   gl_Position = mvp * vec4(a_POSITION, 1.0);\n" +
            "}"
        let fragmentShader =
            "#version 300 es\n" +
            "precision mediump float;\n" +
            "in vec2 v_TEXCOORD;\n" +
            "out vec4 color;\n" +
            "uniform sampler2D u_TEXTURE;\n" +
            "void main() {\n" +
            "   color = texture(u_texture, v_texcoord);\n" +
            "}"
        return { vertexShader, fragmentShader }
    }

    class Doc {
        /**
         * @type {Accessor[]}
         */
        accessors
        /**
         * @type {Asset}
         */
        asset

        /**
         * @type {BufferView[]}
         */
        bufferViews

        /**
         * @type {Buffer[]}
         */
        buffers

        /**
         * @type {GltfImage[]}
         */
        images

        /**
         * @type {Material[]}
         */
        materials

        /**
         * @type {Mesh[]}
         */
        meshes

        /**
         * @type {Node[]}
         */
        nodes

        /**
         * @type {Sampler[]}
         */
        samplers

        /**
         * @type {number}
         */
        scene

        /**
         * @type {Scene[]}
         */
        scenes

        /**
         * @type {Skin[]}
         */
        skins

        /**
         * @type {Texture[]}
         */
        textures
    }

    class Asset {
        /**
         * @type {string}
         */
        generator
        /**
         * @type {string}
         */
        version
    }

    class Accessor {
        /**
         * @type {number}
         */
        bufferView

        /**
         * @type {number}
         */
        componentType

        /**
         * @type {number}
         */
        count

        /**
         * @type {number[]}
         */
        max

        /**
         * @type {number[]}
         */
        min

        /**
         * @type {"VEC2"|"VEC3"|"VEC4"}
         */
        type
    }

    class BufferView {
        /**
         * @type {number}
         */
        buffer
        /**
         * @type {number}
         */
        byteLength
        /**
         * @type {number}
         */
        byteOffset
    }

    class Buffer {
        /**
         * @type {number}
         */
        byteLength
    }

    class GltfImage {
        /**
         * @type {number}
         */
        bufferView
        /**
         * @type {string}
         */
        mimeType
        /**
         * @type {string}
         */
        name
    }

    class Material {
        /**
         * @type {boolean}
         */
        doubleSided
        /**
         * @type {string}
         */
        name
        /**
         * @type {PbrMetallicRoughness}
         */
        pbrMetallicRoughness
    }
    class PbrMetallicRoughness {
        /**
         * @type {BaseColorTexture}
         */
        baseColorTexture
        /**
         * @type {number}
         */
        metallicFactor
        /**
         * @type {number}
         */
        roughnessFactor
    }
    class BaseColorTexture {
        /**
         * @type {number}
         */
        index
        /**
         * @type {number}
         */
        texCoord
    }

    class Mesh {
        /**
         * @type {string}
         */
        name
        /**
         * @type {Primitive[]}
         */
        primitives
    }
    class Primitive {
        /**
         * @type {{[attribute:string]:number}}
         */
        attributes
        /**
         * @type {number}
         */
        indices
        /**
         * @type {number}
         */
        material
    }

    class Node {
        /**
         * @type {number[]}
         */
        children
        /**
         * @type {string}
         */
        name
        /**
         * @type {[number,number,number,number]}
         */
        rotation
        /**
         * @type {[number,number,number]}
         */
        scale
        /**
         * @type {[number,number,number]}
         */
        translation
    }

    class Sampler {
        /**
         * @type {number}
         */
        magFilter
        /**
         * @type {number}
         */
        minFilter
        /**
         * @type {number}
         */
        wrapS
        /**
         * @type {number}
         */
        wrapT
    }

    class Scene {
        /**
         * @type {string}
         */
        name
        /**
         * @type {number[]}
         */
        nodes
    }

    class Skin {
        /**
         * @type {number}
         */
        inverseBindMatrices
        /**
         * @type {number[]}
         */
        joints
        /**
         * @type {string}
         */
        name
    }

    class Texture {
        /**
         * @type {number}
         */
        sampler
        /**
         * @type {number}
         */
        source
    }

    return {
        importFromArrayBuffer,
        createTexture,
        types: {
            Doc,
            Asset,
            Accessor,
            BufferView,
            Buffer,
            GltfImage,
            Material,
            PbrMetallicRoughness,
            BaseColorTexture,
            Mesh,
            Primitive,
            Node,
            Sampler,
            Scene,
            Skin,
            Texture,
        },
    }
})()