const asModel = async (glbBytes) => {
    let doc: Doc = null
    let bin: Uint8Array = null
    let offset = 12

    for (let i = 0; offset < glbBytes.length; i++) {
        const len = glbBytes.slice(offset, offset + 4).reduce((prev, curr, idx) => {
            return prev + curr * 256 ** idx
        }, 0)
        const type = String.fromCharCode(...glbBytes.slice(offset + 4, offset + 8))
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
                console.error(`chunk type : ${type} is not defined`)
            }
        }
        offset += 8 + len
    }
    let imgs: HTMLImageElement[] = []
    const images = doc.images || []
    for (let image of images) {
        let img: HTMLImageElement = await new Promise((resolve, reject) => {
            const bufferView = doc.bufferViews[image.bufferView]

            let imgBlob = new Blob(
                [
                    bin.slice(
                        bufferView.byteOffset || 0,
                        (bufferView.byteOffset || 0) + bufferView.byteLength
                    ),
                ],
                { type: image.mimeType }
            )
            let imgUrl = URL.createObjectURL(imgBlob)
            let img = new Image()
            img.onload = () => resolve(img)
            img.src = imgUrl
        })
        imgs.push(img)
    }
    return { doc, bin, imgs }
}

export const importFromArrayBuffer = (bytes: ArrayBuffer) => {
    console.log(String.fromCharCode(...new Uint8Array(bytes.slice(0, 4))))
    console.log(`ver.${new Uint32Array(bytes.slice(4, 8))[0]}`)
    console.log(`Bytes : ${new Uint32Array(bytes.slice(8, 12))[0]}`)

    return asModel(new Uint8Array(bytes))
}

export const createTexture = (gl: WebGL2RenderingContext, doc: Doc, imgs: HTMLImageElement[]) => {
    return <WebGLTexture[]>(doc.textures || []).map((texInfo) => {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        if (texInfo["sampler"] != undefined) {
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
        }
        const img = imgs[texInfo.source]

        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, img.width, img.height)
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, img)
        gl.generateMipmap(gl.TEXTURE_2D)
        return texture
    })
}

export class Doc {
    accessors: Accessor[]
    asset: Asset
    bufferViews: BufferView[]
    buffers: Buffer[]
    images: GltfImage[]
    materials: Material[]
    meshes: Mesh[]
    nodes: Node[]
    samplers: Sampler[]
    scene: number
    scenes: Scene[]
    skins: Skin[]
    textures: Texture[]
}

export class Asset {
    generator: string
    version: string
}

export class Accessor {
    bufferView: number
    componentType: number
    count: number
    max: number[]
    min: number[]
    type: "VEC2" | "VEC3" | "VEC4"
}

export class BufferView {
    buffer: number
    byteLength: number
    byteOffset: number
}

export class Buffer {
    byteLength: number
}

export class GltfImage {
    bufferView: number
    mimeType: string
    name: string
}

export class Material {
    doubleSided: boolean
    name: string
    pbrMetallicRoughness: PbrMetallicRoughness
}
export class PbrMetallicRoughness {
    baseColorTexture: BaseColorTexture
    metallicFactor: number
    roughnessFactor: number
}
export class BaseColorTexture {
    index: number
    texCoord: number
}

export class Mesh {
    name: string
    primitives: Primitive[]
}
export class Primitive {
    attributes: { [attribute: string]: number }
    indices: number
    material: number
}

export class Node {
    children: number[]
    name: string
    rotation: [number, number, number, number]
    scale: [number, number, number]
    translation: [number, number, number]
}

export class Sampler {
    magFilter: number
    minFilter: number
    wrapS: number
    wrapT: number
}

export class Scene {
    name: string
    nodes: number[]
}

export class Skin {
    inverseBindMatrices: number
    joints: number[]
    name: string
}

export class Texture {
    sampler: number
    source: number
}
