const css = (() => {
    const m = {
        /**
         * 
         * @param {number} mm 
         */
        t(mm) {
            return `margin-top:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        b(mm) {
            return `margin-bottom:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        l(mm) {
            return `margin-left:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        r(mm) {
            return `margin-right:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        y(mm) {
            return m.t(mm) + m.b(mm)
        },
        /**
         *
         * @param {number} mm
         */
        x(mm) {
            return m.l(mm) + m.r(mm)
        },
        /**
         *
         * @param {number} mm
         */
        all(mm) {
            return m.x(mm) + m.y(mm)
        },
        auto: () => `margin:auto;`,
    }

    const p = {
        /**
         * 
         * @param {number} mm 
         */
        t(mm) {
            return `padding-top:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        b(mm) {
            return `padding-bottom:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        l(mm) {
            return `padding-left:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        r(mm) {
            return `padding-right:${mm}mm;`
        },
        /**
         *
         * @param {number} mm
         */
        y(mm) {
            return p.t(mm) + p.b(mm)
        },
        /**
         *
         * @param {number} mm
         */
        x(mm) {
            return p.l(mm) + p.r(mm)
        },
        /**
         *
         * @param {number} mm
         */
        all(mm) {
            return p.x(mm) + p.y(mm)
        },
        auto: () => `padding:auto;`,
    }

    const tx = {
        /**
         *
         * @param {number} mm
         */
        size: (mm) => {
            return `font-size: ${mm}mm;`
        },
        left: () => {
            return `text-align: left;`
        },
        center: () => {
            return `text-align: center;`
        },
        right: () => {
            return `text-align: right;`
        },
        justify: () => {
            return `text-align: justify;`
        },
        /**
         * 
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @param {number} a
         */
        color: (r, g, b, a) => {
            if (a === undefined) {
                return `color:rgb(${r},${g},${b})`
            } else {
                return `color:rgba(${r},${g},${b},${a})`
            }
        }
    }

    let bg = {
        /**
         * 
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @param {number} a
         */
        color: (r, g, b, a) => {
            return `background-color:rgba(${r},${g},${b},${a})`
        }
    }

    const w = {
        /**
         *
         * @param {number} num
         */
        percent: (num) => {
            return `width:${num}%;`
        },
        /**
         *
         * @param {number} num
         */
        mm: (num) => {
            return `width:${num}mm;`
        },
        auto: () => {
            return `width:auto;`
        }
    }

    const h = {
        /**
         *
         * @param {number} num
         */
        percent: (num) => {
            return `height:${num}%;`
        },
        /**
         *
         * @param {number} num
         */
        mm: (num) => {
            return `height:${num}mm;`
        },
        auto: () => {
            return `height:auto;`
        }
    }

    const flex = {
        wrap: {
            yes: () => {
                return `flex-wrap: wrap;`
            },
            reverse: () => {
                return `flex-wrap: wrap-reverse;`
            },
            no: () => {
                return `flex-wrap: nowrap;`
            },
        },
    }

    const align = {
        items: {
            stretch: () => `align-items: stretch;`,
            center: () => `align-items: center;`,
            start: () => `align-items: start;`,
            end: () => `align-items: end;`,
        }
    }

    const display = {
        flex: () => `display: flex;`,
    }

    const pos = {
        rel: () => `position: relative;`,
        abs: () => `position: absolute;`,
    }
    return {
        m,
        p,
        tx,
        bg,
        w,
        h,
        flex,
        align,
        display,
        pos,
    }
})()