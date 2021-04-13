import * as glm from "gl-matrix"

const r90 = (v: glm.vec2) => {
    return glm.vec2.rotate(glm.vec2.create(), v, [0, 0], Math.PI * 0.5)
}
class Mat3 {
    constructor(mat3: glm.mat3) {
        this.mat3 = mat3
    }
    mat3: glm.mat3
    mul(b: glm.mat3) {
        return new Mat3(glm.mat3.mul(glm.mat3.create(), this.mat3, b))
    }
}
export class Line {
    constructor(p1: glm.vec2, p2: glm.vec2) {
        this.p = glm.vec2.clone(p1)
        this.v = glm.vec2.sub(glm.vec2.create(), p2, p1)
    }
    static create(p1: glm.vec2, p2: glm.vec2) {
        return new Line(p1, p2)
    }
    p: glm.vec2
    v: glm.vec2

    static angle(line1: Line, line2: Line) {
        return line1.angle(line2)
    }
    angle(line2: Line) {
        let angle = glm.vec2.angle(this.v, line2.v)
        if (glm.vec2.dot(this.v, r90(line2.v)) >= 0) {
            // angle = Math.PI * 2 - angle
            angle = -angle
        }
        return angle
    }
    scale(line2: Line) {
        return glm.vec2.len(line2.v) / glm.vec2.len(this.v)
    }
    displacement(line2: Line) {
        return glm.vec2.sub(glm.vec2.create(), line2.p, this.p)
    }

    transformMat3(line2: Line) {
        let x_axis = Line.create([0, 0], [1, 0])

        let t1 = glm.mat3.fromTranslation(
            glm.mat3.create(),
            glm.vec2.negate(glm.vec2.create(), this.p)
        )

        let x_angle = this.angle(x_axis)

        let r1 = glm.mat3.fromRotation(glm.mat3.create(), x_angle)

        let scale = this.scale(line2)

        let s = glm.mat3.fromScaling(glm.mat3.create(), [scale, 1])

        let neg_r1 = glm.mat3.fromRotation(glm.mat3.create(), -x_angle)

        let angle = this.angle(line2)

        let r2 = glm.mat3.fromRotation(glm.mat3.create(), angle)

        let t = glm.mat3.fromTranslation(glm.mat3.create(), line2.p)
        return new Mat3(t).mul(r2).mul(neg_r1).mul(s).mul(r1).mul(t1).mat3
    }
}

class Transform {
    constructor(line1: Line, line2: Line) {
        this.org = line1.p
        this.x_angle - line1.angle(Line.create([0, 0], [1, 0]))

        this.angle = line1.angle(line2)
        this.scale = line1.scale(line2)
        this.displacement = line1.displacement(line2)
    }

    org: glm.vec2
    x_angle: number

    angle: number
    scale: number
    displacement: glm.vec2
    withTime(t) {
        let angle = t * this.angle
        let scale = 1 - t + t * this.scale
        let displacement = glm.vec2.mul(glm.vec2.create(), this.displacement, [t, t])

        let tran2org = glm.mat3.fromTranslation(
            glm.mat3.create(),
            glm.vec2.negate(glm.vec2.create(), this.org)
        )

        let rotate2x = glm.mat3.fromRotation(glm.mat3.create(), this.x_angle)

        let scaling = glm.mat3.fromScaling(glm.mat3.create(), [scale, 1])

        let derotate2x = glm.mat3.fromRotation(glm.mat3.create(), -this.x_angle)

        let rotate2target = glm.mat3.fromRotation(glm.mat3.create(), angle)

        let detran2org = glm.mat3.fromTranslation(glm.mat3.create(), this.org)
        let tran2target = glm.mat3.fromTranslation(glm.mat3.create(), displacement)

        return new Mat3(tran2target)
            .mul(detran2org)
            .mul(rotate2target)
            .mul(derotate2x)
            .mul(scaling)
            .mul(rotate2x)
            .mul(tran2org).mat3
    }
}
// let l1 = Line.create([1, 0], [2, 0])
// let l2 = Line.create([-1, 0], [0, -1])
// // let l1 = Line.create([0, 0], [2, 0])
// // let l2 = Line.create([0, 0], [3, 3])
// let m = l1.transformMat3(l2)
// let v = glm.vec2.transformMat3(glm.vec2.create(), [0, 0], m)
// console.log(`v: ${v}`)

// test
{
    // t'->r'->s->r"->r->t"->t
}
