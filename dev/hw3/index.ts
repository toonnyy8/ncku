import * as glm from "gl-matrix"
import * as glUnit from "./gl-unit"
import * as gltf from "./gltf"
import {
    getGlobalJointTransforms,
    getInverseBindMats,
    getAnimStruct,
    getAnimNodes,
    getAnimGlobalJointTransforms,
} from "./gltf-skeleton"
// @ts-ignore
import uint8array from "./assets/Fox.glb"
gltf.importFromArrayBuffer(uint8array).then(({ doc, bin, imgs }) => {
    console.log({ doc, bin, imgs })
    const canvas = document.createElement("canvas")
    canvas.width = 600
    canvas.height = 400
    document.body.append(canvas)

    const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })
    gl.clearColor(0, 0, 0, 1)
    gl.clearDepth(1)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const fieldOfView = (60 * Math.PI) / 180 // in radians
    const aspect = gl.canvas.width / gl.canvas.height
    const zNear = 0.01
    const zFar = 1000
    const projectionMatrix = glm.mat4.perspective(
        glm.mat4.create(),
        fieldOfView,
        aspect,
        zNear,
        zFar
    )
    let v = glm.mat4.lookAt(glm.mat4.create(), [200, 20, 0], [0, 20, 0], [0, 1, 0])
    let mvp = glm.mat4.multiply(glm.mat4.create(), projectionMatrix, v)
    const textures = gltf.createTexture(gl, doc, imgs)
    const primitive = glUnit.primitive(
        gl,
        doc.meshes[0].primitives[0],
        doc,
        bin,
        textures,
        doc.skins[0].joints.length
    )
    let nodes = <gltf.Node[]>JSON.parse(JSON.stringify(doc.nodes))
    console.log(nodes)
    const animStruct = getAnimStruct(doc.animations[1], doc, bin)
    console.log(animStruct)
    let t = 0.00001
    const loop = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        const animNodes = getAnimNodes(animStruct, t)

        const globalJointTransforms = getAnimGlobalJointTransforms(
            2,
            nodes,
            <gltf.Node[]>animNodes,
            glm.mat4.create(),
            {}
        )
        const inverseBindMatrices = getInverseBindMats(doc.skins[0], doc, bin)
        let jointMats = doc.skins[0].joints.map((jointIdx, invIdx) => {
            return glm.mat4.mul(
                glm.mat4.create(),
                globalJointTransforms[jointIdx],
                inverseBindMatrices[invIdx]
            )
        })
        primitive.drawAnim(mvp, jointMats)
        if (t > 0.7) {
            t = 0.00001
        } else {
            t += 0.0166
        }
        requestAnimationFrame(loop)
    }
    loop()
})
