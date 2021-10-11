// @ts-ignore
import arrow_back from "../icon/arrow_back_ios-white-18dp.svg";
// @ts-ignore
import arrow_forward from "../icon/arrow_forward_ios-white-18dp.svg";
import {
  h,
  reactive,
  defineComponent,
  createApp,
  Fragment,
  ref,
  Ref,
  onMounted,
} from "vue";
import { Title, Outline, Tmpl1 } from "./template";
// import { introductionPages } from "./introduction";
// import { literatureReviewPages } from "./literature-review";
// import { methodPages } from "./method";
// import { experimentPages } from "./experiment";
// import { conclusionPages } from "./conclusion";

import { css } from "./css";

import "./index.css";

const Page = defineComponent((props, { slots }) => {
  return () => {
    return <div class="page">{slots.default()}</div>;
  };
});

const App = defineComponent(() => {
  const state = reactive({
    page: (() => {
      let page = Number(window.location.href.split("#/").pop());
      return Number.isNaN(page) ? 0 : page - 1;
    })(),
  });

  const pages = [
    <Tmpl1>
      {{
        title: () => <>統計方式</>,
        content: () => (
          <>
            目前是透過函式庫 compromise 的幫助分割文本
            <ul>
              <li>
                Word：利用 compromise 將句子中的標點符號移除並拆分 Apostrophe
                的縮寫後才計算字數。
              </li>
              <li>Sentence：透過 compromise 輔助拆分句子後才進行計算。</li>
            </ul>
          </>
        ),
      }}
    </Tmpl1>,
    <Tmpl1>
      {{
        title: () => <>系統架構</>,
        content: () => (
          <img src="./img/architecture.png" style={css.w.percent(100)} />
        ),
      }}
    </Tmpl1>,
  ];
  const forward = () => {
    if (state.page < pages.length - 1) {
      state.page++;
      window.location.href = `#/${state.page + 1}`;
    }
  };

  const back = () => {
    if (state.page > 0) {
      state.page--;
      window.location.href = `#/${state.page + 1}`;
    }
  };
  let buf = [];
  window.addEventListener("keydown", (e) => {
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
          let target = Number(buf.reduce((prev, curr) => prev + curr, ""));
          if (target < 1) {
            target = 1;
          } else if (target > pages.length) {
            target = pages.length;
          }
          state.page = target - 1;
          window.location.href = `#/${target}`;
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

  return () => (
    <div style="width:100vw;height:100vh;">
      {pages.map((page, idx) => {
        return (
          <Page class={idx != state.page ? "none" : ""}>
            {() => (
              <>
                {page}
                <div class={["page-num", "text-lg"]}>{idx + 1}</div>
              </>
            )}
          </Page>
        );
      })}
      <img onClick={back} src={arrow_back} class="page-back-button"></img>
      <img
        onClick={forward}
        src={arrow_forward}
        class="page-forward-button"
      ></img>
    </div>
  );
});

createApp(App).mount(document.body);
