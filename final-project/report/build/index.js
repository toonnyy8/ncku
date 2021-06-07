(() => {
  // final-project/report/icon/arrow_back_ios-black-18dp.svg
  var arrow_back_ios_black_18dp_default = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTEuNjcgMy44N0w5LjkgMi4xIDAgMTJsOS45IDkuOSAxLjc3LTEuNzdMMy41NCAxMnoiLz48L3N2Zz4=";

  // final-project/report/icon/arrow_forward_ios-black-18dp.svg
  var arrow_forward_ios_black_18dp_default = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNS44OCA0LjEyTDEzLjc2IDEybC03Ljg4IDcuODhMOCAyMmwxMC0xMEw4IDJ6Ii8+PC9zdmc+";

  // final-project/report/dev/css.js
  var css = (() => {
    const m = {
      t(mm) {
        return `margin-top:${mm}mm;`;
      },
      b(mm) {
        return `margin-bottom:${mm}mm;`;
      },
      l(mm) {
        return `margin-left:${mm}mm;`;
      },
      r(mm) {
        return `margin-right:${mm}mm;`;
      },
      y(mm) {
        return m.t(mm) + m.b(mm);
      },
      x(mm) {
        return m.l(mm) + m.r(mm);
      },
      all(mm) {
        return m.x(mm) + m.y(mm);
      },
      auto: () => `margin:auto;`
    };
    const p = {
      t(mm) {
        return `padding-top:${mm}mm;`;
      },
      b(mm) {
        return `padding-bottom:${mm}mm;`;
      },
      l(mm) {
        return `padding-left:${mm}mm;`;
      },
      r(mm) {
        return `padding-right:${mm}mm;`;
      },
      y(mm) {
        return p.t(mm) + p.b(mm);
      },
      x(mm) {
        return p.l(mm) + p.r(mm);
      },
      all(mm) {
        return p.x(mm) + p.y(mm);
      },
      auto: () => `padding:auto;`
    };
    const tx = {
      size: (mm) => {
        return `font-size: ${mm}mm;`;
      },
      left: () => {
        return `text-align: left;`;
      },
      center: () => {
        return `text-align: center;`;
      },
      right: () => {
        return `text-align: right;`;
      },
      justify: () => {
        return `text-align: justify;`;
      },
      color: (r, g, b, a) => {
        if (a === void 0) {
          return `color:rgb(${r},${g},${b});`;
        } else {
          return `color:rgba(${r},${g},${b},${a});`;
        }
      }
    };
    let bg = {
      color: (r, g, b, a) => {
        if (a === void 0) {
          return `background-color:rgb(${r},${g},${b});`;
        } else {
          return `background-color:rgba(${r},${g},${b},${a});`;
        }
      }
    };
    const w = {
      percent: (num) => {
        return `width:${num}%;`;
      },
      mm: (num) => {
        return `width:${num}mm;`;
      },
      auto: () => {
        return `width:auto;`;
      }
    };
    const h = {
      percent: (num) => {
        return `height:${num}%;`;
      },
      mm: (num) => {
        return `height:${num}mm;`;
      },
      auto: () => {
        return `height:auto;`;
      }
    };
    const flex = {
      wrap: {
        yes: () => {
          return `flex-wrap: wrap;`;
        },
        reverse: () => {
          return `flex-wrap: wrap-reverse;`;
        },
        no: () => {
          return `flex-wrap: nowrap;`;
        }
      }
    };
    const align = {
      items: {
        stretch: () => `align-items: stretch;`,
        center: () => `align-items: center;`,
        start: () => `align-items: start;`,
        end: () => `align-items: end;`
      }
    };
    const display = {
      flex: () => `display: flex;`
    };
    const pos = {
      rel: () => `position: relative;`,
      abs: () => `position: absolute;`
    };
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
      pos
    };
  })();

  // final-project/report/dev/html.js
  var html = (() => {
    const bindOpts = (el, options) => {
      if (options != null) {
        if (options.id != null) {
          el.id = options.id;
        }
        if (options.class != null) {
          el.classList.add(...options.class);
        }
        if (options.style != null) {
          el.style.cssText = options.style.reduce((prev, curr) => prev + curr, "");
        }
      }
      return el;
    };
    const appendElems = (el, texts, elems) => {
      if (texts != void 0) {
        let _elems = [...elems, ...new Array(texts.length - elems.length).fill("")];
        for (let i = 0; i < texts.length; i++) {
          el.append(texts[i]);
          el.append(_elems[i]);
        }
      }
      return el;
    };
    const page = (options) => {
      return (texts, ...elems) => {
        let opt = options != void 0 ? { class: ["page"], id: options.id } : { class: ["page"] };
        return appendElems(bindOpts(document.createElement("div"), opt), texts, elems);
      };
    };
    const p = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("p"), options), texts, elems);
      };
    };
    const span = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("span"), options), texts, elems);
      };
    };
    const div = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("div"), options), texts, elems);
      };
    };
    const br = () => {
      let newBr = document.createElement("br");
      return newBr;
    };
    const hr = () => {
      return document.createElement("hr");
    };
    const img2 = (options) => {
      let el = bindOpts(document.createElement("img"), options);
      el.src = options.src;
      return el;
    };
    const video = (options) => {
      let el = bindOpts(document.createElement("video"), options);
      el.src = options.src;
      el.controls = options.controls;
      el.autoplay = options.autoplay;
      el.loop = options.loop;
      el.onclick = () => {
        if (el.paused) {
          el.play();
        } else {
          el.pause();
        }
      };
      return el;
    };
    const ul = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("ul"), options), texts, elems);
      };
    };
    const ol = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("ol"), options), texts, elems);
      };
    };
    const li = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("li"), options), texts, elems);
      };
    };
    const a = (options = {}) => {
      return (texts, ...elems) => {
        return appendElems((() => {
          let el = bindOpts(document.createElement("a"), options);
          el.href = options.href ? options.href : "";
          return el;
        })(), texts, elems);
      };
    };
    const table = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("table"), options), texts, elems);
      };
    };
    const tr = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("tr"), options), texts, elems);
      };
    };
    const td = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("td"), options), texts, elems);
      };
    };
    const sub = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("sub"), options), texts, elems);
      };
    };
    const sup = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("sup"), options), texts, elems);
      };
    };
    const del = (options) => {
      return (texts, ...elems) => {
        return appendElems(bindOpts(document.createElement("del"), options), texts, elems);
      };
    };
    const render2 = (...pages) => {
      const hidden = (_page) => {
        _page.classList.add("none");
      };
      const display = (_page) => {
        _page.classList.remove("none");
      };
      const tagPageNum = (_page, pageNum3) => {
        _page.appendChild(div({ class: ["page-num", "text-lg"] })`${pageNum3 + 1}`);
      };
      let pageNum2 = 0;
      pages.forEach((_page, idx) => {
        hidden(_page);
        tagPageNum(_page, idx);
        document.body.appendChild(_page);
      });
      display(pages[0]);
      return {
        next() {
          if (pageNum2 < pages.length - 1) {
            hidden(pages[pageNum2]);
            pageNum2 += 1;
            display(pages[pageNum2]);
          }
        },
        prev() {
          if (pageNum2 > 0) {
            hidden(pages[pageNum2]);
            pageNum2 -= 1;
            display(pages[pageNum2]);
          }
        },
        jump(to) {
          console.log(to);
          if (to >= 0 && to <= pages.length - 1) {
            hidden(pages[pageNum2]);
            pageNum2 = to;
            display(pages[pageNum2]);
          }
        },
        at() {
          return pageNum2;
        }
      };
    };
    return {
      page,
      p,
      span,
      div,
      br,
      hr,
      img: img2,
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
      render: render2
    };
  })();

  // final-project/report/dev/title.js
  var title = (() => {
    const span6xl = html.span({ class: ["text-6xl"] });
    const span3xl = html.span({ class: ["text-3xl"] });
    const span2xl = html.span({ class: ["text-2xl"] });
    const spanlg = html.span({ class: ["text-lg"] });
    const pxl_1 = html.p({ class: ["text-xl"], style: [css.tx.left(), css.w.percent(48), css.m.auto()] });
    const pxl_2 = html.p({ class: ["text-xl"], style: [css.p.all(10)] });
    const div_vc = html.div({
      style: [
        css.display.flex(),
        css.flex.wrap.yes(),
        css.align.items.center(),
        css.h.percent(100),
        css.w.percent(100)
      ]
    });
    const div_hc = html.div({
      class: ["text-xl"],
      style: [
        css.p.all(10),
        css.tx.center(),
        css.w.percent(100)
      ]
    });
    return [
      html.page()([
        div_vc([
          div_hc([
            html.a({ class: ["text-3xl"], href: "https://arxiv.org/abs/2009.06732" })`Efficient Transformers: A Survey`,
            html.hr(),
            pxl_1([
              spanlg`Yi Tay, Mostafa Dehghani, Dara Bahri, Donald Metzler`
            ])
          ])
        ])
      ]),
      html.page()([
        div_vc([
          div_hc([
            html.a({ class: ["text-3xl"], href: "https://arxiv.org/abs/2011.04006" })`Long Range Arena: A Benchmark for Efficient Transformers`,
            html.hr(),
            pxl_1([
              spanlg`Yi Tay, Mostafa Dehghani, Samira Abnar, Yikang Shen, Dara Bahri, Philip Pham, Jinfeng Rao, Liu Yang, Sebastian Ruder, Donald Metzler`
            ])
          ])
        ])
      ]),
      html.page()([
        div_vc([
          div_hc([
            span3xl`Outline`,
            html.hr(),
            html.ul({ style: [css.tx.left(), css.m.l(70)] })([
              html.li()`Introduction`,
              html.li()`Efficient Transformers`,
              html.li()`Long Range Arena`,
              html.li()`Experiments`,
              html.li()`Conclusion`
            ])
          ])
        ])
      ])
    ];
  })();

  // final-project/report/dev/index.ts
  var { render, img } = html;
  var control = render(...title);
  var pageNum = Number(window.location.href.split("#/")[1] || 1);
  control.jump(pageNum - 1);
  pageNum = control.at() + 1;
  window.location.href = `#/${pageNum}`;
  var back = () => {
    control.prev();
    pageNum = control.at() + 1;
    window.location.href = `#/${pageNum}`;
  };
  var forward = () => {
    control.next();
    pageNum = control.at() + 1;
    window.location.href = `#/${pageNum}`;
  };
  console.log(document.body.classList.contains("theme-light"));
  var backB;
  var forwardB;
  if (document.body.classList.contains("theme-light")) {
    backB = img({ class: ["page-back-button"], src: arrow_back_ios_black_18dp_default });
    forwardB = img({ class: ["page-forward-button"], src: arrow_forward_ios_black_18dp_default });
    document.body.append(backB, forwardB);
  } else {
    backB = img({ class: ["page-back-button"], src: "./icon/arrow_back_ios-white-18dp.svg" });
    forwardB = img({
      class: ["page-forward-button"],
      src: "./icon/arrow_forward_ios-white-18dp.svg"
    });
    document.body.append(backB, forwardB);
  }
  backB.onclick = back;
  forwardB.onclick = forward;
  var buf = [];
  window.addEventListener("keydown", (e) => {
    console.log(e.key);
    switch (e.key) {
      case "PageUp":
      case "ArrowUp":
      case "ArrowLeft": {
        back();
        break;
      }
      case "PageDown":
      case "ArrowDown":
      case "ArrowRight": {
        forward();
        break;
      }
      case "Enter": {
        if (buf.length != 0) {
          control.jump(Number(buf.reduce((prev, curr) => prev + curr, "")) - 1);
          pageNum = control.at() + 1;
          window.location.href = `#/${pageNum}`;
          buf = [];
        }
        break;
      }
      default: {
        if (e.key >= "0" && e.key <= "9") {
          buf = buf.concat(e.key);
        } else {
          buf = [];
        }
      }
    }
  });
})();
//# sourceMappingURL=index.js.map
