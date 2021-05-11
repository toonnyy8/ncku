import * as gltf from "./gltf"
import * as shader from "./shader"
import * as glm from "gl-matrix"

export const getGlobalJointTransforms = (
    idx: number,
    nodes: gltf.Node[],
    gMat: glm.mat4,
    jointMats: { [idx: number]: glm.mat4 }
) => {
    jointMats[idx] = glm.mat4.mul(
        glm.mat4.create(),
        gMat,
        glm.mat4.fromRotationTranslationScale(
            glm.mat4.create(),
            nodes[idx]["rotation"] || [0, 0, 0, 0],
            nodes[idx]["translation"] || [0, 0, 0],
            nodes[idx]["scale"] || [1, 1, 1]
        )
    )
    return (
        nodes[idx].children?.reduce((jointMats, child) => {
            return getGlobalJointTransforms(
                child,
                nodes,
                jointMats[idx],
                Object.assign({}, jointMats)
            )
        }, jointMats) ?? jointMats
    )
}
const getAccessorBuff = (accessorIdx: number, doc: gltf.Doc, bin: Uint8Array) => {
    const accessor = doc.accessors[accessorIdx]
    const bv = doc.bufferViews[accessor.bufferView]
    const buf = bin.slice(
        bv.byteOffset + (accessor?.byteOffset ?? 0),
        bv.byteOffset + bv.byteLength
    )
    const size = (() => {
        switch (accessor.type) {
            case "SCALAR":
                return 1
            case "VEC2":
                return 2
            case "VEC3":
                return 3
            case "VEC4":
                return 4
            case "MAT2":
                return 4
            case "MAT3":
                return 9
            case "MAT4":
                return 16
        }
    })()
    const stride = bv.byteStride
    return new Array(accessor.count).fill(0).map((_, idx) => {
        if (stride == undefined)
            return new Float32Array(buf.slice(4 * idx * size, 4 * (idx + 1) * size).buffer)
        else
            return new Float32Array(
                buf.slice(idx * stride, (idx + 1) * stride).slice(0, 4 * size).buffer
            )
    })
    // const f32arr = new Float32Array(buf.buffer)
    // const size = f32arr.length / accessor.count
    //
    // console.log(accessor.type)
    // console.log(accessor.count)
    // console.log(accessorIdx)

    // return new Array(accessor.count).fill(0).map((_, idx) => {
    //     return f32arr.slice(idx * size, (idx + 1) * size)
    // })
}
export const getInverseBindMats = (skin: gltf.Skin, doc: gltf.Doc, bin: Uint8Array) => {
    return getAccessorBuff(skin.inverseBindMatrices, doc, bin)
}

interface AnimUnit {
    input: number[]
    output: Float32Array[]
    node: number
    path: "rotation" | "scale" | "translation"
}

export const getAnimStruct = (
    anim: gltf.Animation,
    doc: gltf.Doc,
    bin: Uint8Array
): [AnimUnit[], number] => {
    return [
        anim.channels.map((ch) => {
            const { input, output } = anim.samplers[ch.sampler]
            return {
                ...ch.target,
                input: getAccessorBuff(input, doc, bin).reduce(
                    (prev, curr) => [...prev, ...curr],
                    <number[]>[]
                ),
                output: getAccessorBuff(output, doc, bin),
            }
        }),
        anim.channels.reduce((timeMax, ch) => {
            const { input } = anim.samplers[ch.sampler]
            return Math.max(timeMax, doc.accessors[input].max[0])
        }, 0),
    ]
}

export const getAnimNodes = (animStruct: AnimUnit[], time: number) => {
    let nodes = {}
    animStruct.map((animUnit) => {
        const idx = animUnit.input.findIndex((t) => t >= time)
        let total = animUnit.input[idx] - (animUnit.input[idx - 1] ?? 0)
        let a = (animUnit.input[idx] - time) / total
        let b = (time - (animUnit.input[idx - 1] ?? 0)) / total
        let vec_len = animUnit.path == "rotation" ? 4 : animUnit.path == "scale" ? 3 : 4
        let vec = new Array(vec_len).fill(0).map((_, j) => {
            return animUnit.output[idx - 1]?.[j] * a + animUnit.output[idx]?.[j] * b
        })
        if (nodes[animUnit.node] == undefined) {
            nodes[animUnit.node] = {}
        }
        nodes[animUnit.node][animUnit.path] = <any>vec
    })
    return nodes
}

export const getAnimGlobalJointTransforms = (
    idx: number,
    nodes: gltf.Node[],
    animNodes: gltf.Node[],
    gMat: glm.mat4,
    jointMats: { [idx: number]: glm.mat4 }
) => {
    // jointMats[idx] = glm.mat4.mul(
    //     glm.mat4.create(),
    //     gMat,
    //     glm.mat4.fromRotationTranslationScale(
    //         glm.mat4.create(),
    //         nodes[idx]["rotation"] || [0, 0, 0, 0],
    //         nodes[idx]["translation"] || [0, 0, 0],
    //         nodes[idx]["scale"] || [1, 1, 1]
    //     )
    // )
    jointMats[idx] = glm.mat4.mul(
        glm.mat4.create(),
        gMat,
        glm.mat4.fromRotationTranslationScale(
            glm.mat4.create(),
            animNodes[idx]?.["rotation"] ?? nodes[idx]["rotation"] ?? [0, 0, 0, 0],
            animNodes[idx]?.["translation"] ?? nodes[idx]["translation"] ?? [0, 0, 0],
            animNodes[idx]?.["scale"] ?? nodes[idx]["scale"] ?? [1, 1, 1]
        )
    )
    return (
        nodes[idx].children?.reduce((jointMats, child) => {
            return getAnimGlobalJointTransforms(
                child,
                nodes,
                animNodes,
                jointMats[idx],
                Object.assign({}, jointMats)
            )
        }, jointMats) ?? jointMats
    )
}
