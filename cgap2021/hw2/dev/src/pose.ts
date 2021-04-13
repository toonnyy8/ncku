import * as glm from "gl-matrix"

// class Point {
//     constructor(x: number, y: number) {
//         this.x = x
//         this.y = y
//     }
//     x: number
//     y: number
//     static create(x: number, y: number) {
//         return new Point(x, y)
//     }
//     static default() {
//         return Point.create(0, 0)
//     }

//     static add(p1: Point, p2: Point) {
//         return p1.add(p2)
//     }
//     add(p2: Point) {
//         return Point.create(this.x + p2.x, this.y + p2.y)
//     }
//     static sub(p1: Point, p2: Point) {
//         return p1.sub(p2)
//     }
//     sub(p2: Point) {
//         return Point.create(this.x - p2.x, this.y - p2.y)
//     }

//     static mul(p1: Point, a: number) {
//         return p1.mul(a)
//     }
//     mul(a: number) {
//         return Point.create(this.x * a, this.y * a)
//     }
//     static div(p1: Point, a: number) {
//         return p1.div(a)
//     }
//     div(a: number) {
//         return Point.create(this.x / a, this.y / a)
//     }

//     static dot(p1: Point, p2: Point) {
//         return p1.dot(p2)
//     }
//     dot(p2: Point) {
//         return this.x / p2.x + this.y * p2.y
//     }
// }

// class Vec {}

// class Line {
//     constructor(p1: Point, p2: Point) {
//         this.p = p1
//         this.v = p2.sub(p1)
//     }
//     private p: Point
//     private v: Point
//     static create(p1: Point, p2: Point) {
//         return new Line(p1, p2)
//     }

//     static to_vec(line: Line) {
//         return line.to_vec()
//     }
//     to_vec() {
//         return this.v
//     }

//     // l1.p1 + offset = l2.p1
//     static offset(l1: Line, l2: Line) {
//         return l1.offset(l2)
//     }
//     offset(l2: Line) {
//         return l2.p.sub(this.p)
//     }
// }
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
class Line {
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
            angle = Math.PI * 2 - angle
        }
        return angle
    }
    scale(line2: Line) {
        return glm.vec2.len(line2.v) / glm.vec2.len(this.v)
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
let l1 = Line.create([1, 0], [2, 0])
let l2 = Line.create([-1, 0], [0, -1])
// let l1 = Line.create([0, 0], [2, 0])
// let l2 = Line.create([0, 0], [3, 3])
let m = l1.transformMat3(l2)
let v = glm.vec2.transformMat3(glm.vec2.create(), [0, 0], m)
console.log(`v: ${v}`)
// let m2 = glm.mat3.scale(glm.mat3.create(), glm.mat3.create(), [2, 1])
// let v2 = glm.vec2.transformMat3(glm.vec2.create(), [2, 2], m2)
// console.log(`v2: ${v2}`)

// test
{
    // t'->r'->s->r"->r->t"->t
}
