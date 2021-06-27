export const html = (() => {
    /**
     * 
     * @param {HTMLElement} el
     * @param {{
     * id?:string
     * class?:string[]
     * style?:string[]
     * }} options
     */
    const bindOpts = (el, options) => {
        if (options != null) {
            if (options.id != null) {
                el.id = options.id
            }
            if (options.class != null) {
                el.classList.add(...options.class)
            }
            if (options.style != null) {
                el.style.cssText = options.style.reduce((prev, curr) => prev + curr, "")
            }
        }
        return el
    }

    /**
     * 
     * @param {HTMLElement} el
     * @param {string[]} texts
     * @param {HTMLElement[]} elems
     */
    const appendElems = (el, texts, elems) => {
        if (texts != undefined) {
            let _elems = [...elems, ...new Array(texts.length - elems.length).fill("")]
            for (let i = 0;i < texts.length;i++) {
                el.append(texts[i])
                el.append(_elems[i])
            }
        }
        return el
    }
    /**
     * 
     * @param {{id:string}} options 
     * 
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const page = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            let opt = options != undefined ? { class: ["page"], id: options.id } : { class: ["page"] }
            return appendElems(
                bindOpts(
                    document.createElement("div"),
                    opt,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     * 
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options 
     * 
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const p = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("p"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const span = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("span"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const div = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("div"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    const br = () => {
        let newBr = document.createElement("br")
        return newBr
    }
    const hr = () => {
        return document.createElement("hr")
    }

    /**
     *
     * @param {{
     * id?:string
     * class?:string[]
     * style?:string[]
     * src:string
     * }} options
     */
    const img = (options) => {
        /**
         * @type {HTMLImageElement}
         */
        let el = bindOpts(
            document.createElement("img"),
            options,
        )
        el.src = options.src
        return el
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * src:string
     * controls:boolean,
     * autoplay:boolean,
     * loop:boolean,
     * }} options
     */
    const video = (options) => {
        /**
         * @type {HTMLVideoElement}
         */
        let el = bindOpts(
            document.createElement("video"),
            options,
        )
        el.src = options.src
        el.controls = options.controls
        el.autoplay = options.autoplay
        el.loop = options.loop
        el.onclick = () => {
            if (el.paused) {
                el.play()
            } else { el.pause() }

        }

        return el
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const ul = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("ul"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const ol = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("ol"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const li = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("li"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * href:string
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const a = (options = {}) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                (() => {
                    let el = bindOpts(
                        document.createElement("a"),
                        options,
                    )
                    el.href = options.href ? options.href : ""
                    return el
                })(),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const table = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("table"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const tr = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("tr"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }
    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const td = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("td"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const sub = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("sub"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const sup = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("sup"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     *
     * @param {{
     * id:string
     * class:string[]
     * style:string[]
     * }} options
     *
     * @return {(texts:Array<string|HTMLElement>,elems:HTMLElement[])=>HTMLElement}
     */
    const del = (options) => {
        /**
         * 
         * @param  {Array<string|HTMLElement>} texts
         * @param  {HTMLElement[]} elems
         */
        return (texts, ...elems) => {
            return appendElems(
                bindOpts(
                    document.createElement("del"),
                    options,
                ),
                texts,
                elems,
            )
        }
    }

    /**
     * 
     * @param {...HTMLElement} pages 
     */
    const render = (...pages) => {
        /**
         * 
         * @param {HTMLElement} _page 
         */
        const hidden = (_page) => {
            _page.classList.add("none")
        }

        /**
         * 
         * @param {HTMLElement} _page 
         */
        const display = (_page) => {
            _page.classList.remove("none")
        }

        /**
         * 
         * @param {HTMLElement} _page 
         * @param {number} pageNum 
         */
        const tagPageNum = (_page, pageNum) => {
            _page.appendChild(div({ class: ["page-num", "text-lg"] })`${pageNum + 1}`)
        }
        let pageNum = 0
        pages.forEach((_page, idx) => {
            hidden(_page)
            tagPageNum(_page, idx)
            document.body.appendChild(_page)
        })
        display(pages[0])
        return {
            next() {
                if (pageNum < pages.length - 1) {
                    hidden(pages[pageNum])
                    pageNum += 1
                    display(pages[pageNum])
                }
            },
            prev() {
                if (pageNum > 0) {
                    hidden(pages[pageNum])
                    pageNum -= 1
                    display(pages[pageNum])
                }
            },
            jump(to) {
                console.log(to)
                if (to >= 0 && to <= pages.length - 1) {
                    hidden(pages[pageNum])
                    pageNum = to
                    display(pages[pageNum])
                }
            },
            at() {
                return pageNum
            }
        }
    }


    return {
        page,
        p,
        span,
        div,
        br,
        hr,
        img,
        video,
        ul,
        ol,
        li,
        a,
        table,
        tr,
        td,
        sub,
        sup,
        del,
        render,
    }
})()