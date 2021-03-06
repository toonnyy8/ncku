const Gltf = (() => {
    /**
     * @param {Uint8Array} glbBytes
     */
    const asGltf = (glbBytes) => {
        /**
         * @type {Gltf}
         */
        let gltf = null;
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
                    gltf = JSON.parse(String.fromCharCode(...data))
                    break
                }
                default: {
                    console.error(`chunk type : ${type} is not defined`);
                }
            }
            offset += 8 + len;
        }

        return { gltf, bin };
    }

    /**
     * @param {ArrayBuffer} bytes
     */
    const importFromArrayBuffer = (bytes) => {
        console.log(String.fromCharCode(...new Uint8Array(bytes.slice(0, 4))))
        console.log(`ver.${new Uint32Array(bytes.slice(4, 8))[0]}`)
        console.log(`Bytes : ${new Uint32Array(bytes.slice(8, 12))[0]}`)

        return asGltf(new Uint8Array(bytes))
    }

    class Gltf {
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
         * @type {Image[]}
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

    class Image {
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
         * @type {Attribute[]}
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
    class Attribute {
        /**
         * @type {number}
         */
        JOINTS_0
        /**
         * @type {number}
         */
        NORMAL
        /**
         * @type {number}
         */
        POSITION
        /**
         * @type {number}
         */
        TANGENT
        /**
         * @type {number}
         */
        TEXCOORD_0
        /**
         * @type {number}
         */
        WEIGHTS_0
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

    return { importFromArrayBuffer }
})()