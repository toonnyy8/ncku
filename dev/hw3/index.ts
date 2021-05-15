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
    canvas.style.position = "absolute"
    canvas.style.zIndex = "0"
    canvas.width = 600
    canvas.height = 400
    document.body.append(canvas)

    const bone_canvas = document.createElement("canvas")
    bone_canvas.style.position = "absolute"
    bone_canvas.style.zIndex = "1"
    const ctx = bone_canvas.getContext("2d")
    bone_canvas.width = 600
    bone_canvas.height = 400
    document.body.append(bone_canvas)
    let down = false
    let rotationX = 0
    let rotationY = 0
    let mouseX = 0
    let mouseY = 0

    bone_canvas.onmousedown = (e) => {
        down = true
        mouseX = e.x
        mouseY = e.y
    }
    bone_canvas.onmousemove = (e) => {
        if (down) {
            rotationY += (Math.PI * (e.x - mouseX)) / 360
            rotationX += (Math.PI * (e.y - mouseY)) / 360
        }
        mouseX = e.x
        mouseY = e.y
    }
    bone_canvas.onmouseup = () => {
        down = false
    }

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
    let v = glm.mat4.lookAt(glm.mat4.create(), [75, 20, 150], [0, 20, 0], [0, 1, 0])
    // let mvp = glm.mat4.multiply(glm.mat4.create(), projectionMatrix, v)

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
    const [animStruct0, timeMax0] = getAnimStruct(doc.animations[0], doc, bin)
    const [animStruct1, timeMax1] = getAnimStruct(doc.animations[1], doc, bin)
    const [animStruct2, timeMax2] = getAnimStruct(doc.animations[2], doc, bin)

    const animStructs = [animStruct0, animStruct1, animStruct2]
    const timeMaxs = [timeMax0, timeMax1, timeMax2]

    let sele_bone_idx = 0
    document.onkeydown = (e) => {
        switch (e.code) {
            case "KeyS": {
                sele_bone_idx -= 1
                break
            }
            case "KeyW": {
                sele_bone_idx += 1
                break
            }
            case "KeyA": {
                sele_bone_idx -= 1
                break
            }
            case "KeyD": {
                sele_bone_idx += 1
                break
            }
        }
        if (sele_bone_idx < 0) {
            sele_bone_idx = doc.skins[0].joints.length + sele_bone_idx
        } else {
            sele_bone_idx %= doc.skins[0].joints.length - 1
        }
        // console.log(sele_bone_idx)
    }

    let t = 0.1
    let animIdx = 2
    const loop = () => {
        // let mvp = glm.mat4.multiply(glm.mat4.create(), projectionMatrix, v)
        if (rotationY > Math.PI * 2) {
            rotationY -= Math.PI * 2
        }
        if (rotationX > Math.PI / 2) {
            rotationX = Math.PI / 2
        } else if (rotationX < -Math.PI / 2) {
            rotationX = -Math.PI / 2
        }
        let v1 = glm.mat4.rotateX(glm.mat4.create(), v, rotationX)
        let v2 = glm.mat4.rotateY(glm.mat4.create(), v1, rotationY)
        let mvp = glm.mat4.multiply(glm.mat4.create(), projectionMatrix, v2)

        const animNodes = getAnimNodes(animStructs[animIdx], t)

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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        primitive.drawAnim(mvp, jointMats)

        ctx.clearRect(0, 0, 600, 400)
        let bones_vec = doc.skins[0].joints.map((jointIdx) => {
            let mat = glm.mat4.mul(glm.mat4.create(), v2, globalJointTransforms[jointIdx])

            let vec = glm.vec3.transformMat4(glm.vec3.create(), glm.vec3.create(), mat)
            return { id: jointIdx, vec }
        })
        bones_vec.sort((a, b) => a.vec[2] - b.vec[2])
        let z_max = bones_vec.slice(-1)[0].vec[2]
        let z_min = bones_vec[0].vec[2]

        bones_vec.forEach(({ id, vec }) => {
            let z = vec[2]
            z = (z - z_min) / (z_max - z_min)
            ctx.fillStyle = `rgb(${Math.round((100 * z) / 2) + 155},${Math.round(
                200 * z
            )},${Math.round(255 * z)})`

            let bone_vec = glm.vec3.transformMat4(glm.vec3.create(), vec, projectionMatrix)

            ctx.beginPath()
            ctx.arc(bone_vec[0] * 300 + 300, (1 - bone_vec[1]) * 200, 6, 0, 2 * Math.PI)
            ctx.fill()
            if (id == doc.skins[0].joints[sele_bone_idx]) {
                ctx.lineWidth = 2
                ctx.strokeStyle = `rgb(100,255,255)`
                ctx.beginPath()
                ctx.arc(bone_vec[0] * 300 + 300, (1 - bone_vec[1]) * 200, 10, 0, 2 * Math.PI)
                ctx.stroke()
            }
        })

        t += 0.0166
        t %= timeMaxs[animIdx]
        requestAnimationFrame(loop)
    }
    loop()
})
