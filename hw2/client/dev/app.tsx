import {
  createApp,
  ref,
  defineComponent,
  h,
  Fragment,
  Ref,
  onMounted,
} from "vue";
import { PubMed } from "./types";
import { Chart } from "@antv/g2";

const ZipfChart = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  const tokenNum = ref(1);
  const range = ref({ min: 1, max: 1 });
  const useStemmer = ref(true);

  let zipf: { token: string; count: number }[] = [];
  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      autoFit: true,
      height: 300,
    });

    changeStemmer(true);
  });

  const inputMin = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { min: Number(e.target.value), max: range.value.max };
    chart.data(zipf.slice(range.value.min - 1, range.value.max));
    chart.render();
  };

  const inputMax = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { max: Number(e.target.value), min: range.value.min };
    chart.data(zipf.slice(range.value.min - 1, range.value.max));
    chart.render();
  };

  const changeStemmer = (_useStemmer: boolean) => {
    useStemmer.value = _useStemmer;
    slots.changeStemmer(useStemmer.value);
    fetch(`./zipf/${_useStemmer}`)
      .then((res) => res.json())
      .then((zipfData: { token: string; count: number }[]) => {
        zipf = zipfData;
        tokenNum.value = zipf.length;
        range.value = {
          min: Math.ceil(tokenNum.value * 0.01),
          max: Math.ceil(tokenNum.value * 0.05),
        };

        chart.data(zipf.slice(range.value.min - 1, range.value.max));
        chart.scale("count", {
          nice: true,
        });

        chart.tooltip({
          showMarkers: false,
        });
        chart.interaction("active-region");

        chart.interval().position("token*count");

        chart.render();
      });
  };

  return () => (
    <div style="position: relative;">
      <div ref={chartRef} />
      <br />

      <input
        type="number"
        value={range.value.min}
        max={range.value.max}
        min="1"
        step="1"
        onChange={inputMin}
      />
      <button
        style={[
          "position: absolute;",
          "left: 50%;",
          "transform: translate(-50%,0%);",
        ]}
        class={[useStemmer.value ? "on" : ""]}
        onClick={() => changeStemmer(!useStemmer.value)}
      >
        stemmer
      </button>
      <input
        type="number"
        value={range.value.max}
        max={tokenNum.value}
        min={range.value.min}
        step="1"
        onChange={inputMax}
        style="right:0px; position: absolute;"
      />
    </div>
  );
});

const pageListFn = (
  page: number,
  numOfPage: number,
  toPage: (page: number) => () => void
) => {
  let max = Math.min(numOfPage, page + 2);
  let min = Math.max(1, page - 2);
  if (max - min != 4 && (min != 1 || max != numOfPage)) {
    if (min == 1) {
      max = min + 4;
    } else if (max == numOfPage) {
      min = max - 4;
    }
  }
  max = Math.min(numOfPage, max);
  min = Math.max(1, min);

  let pageIndices = Array(max - min + 1)
    .fill(0)
    .map((_, idx) => idx + min);
  return (
    <div style="width:fit-content;margin-left:auto;margin-right:auto;">
      <div class="page-button" onClick={toPage(1)}>
        {"<<"}
      </div>
      <div class="page-button" onClick={toPage(page - 1)}>
        {"<"}
      </div>
      {pageIndices.map((pageIdx) => {
        if (pageIdx == page) {
          return (
            <div
              class="page-button page-button-focus"
              onClick={toPage(pageIdx)}
            >
              {pageIdx}
            </div>
          );
        } else {
          return (
            <div class="page-button" onClick={toPage(pageIdx)}>
              {pageIdx}
            </div>
          );
        }
      })}

      <div class="page-button" onClick={toPage(page + 1)}>
        {">"}
      </div>
      <div class="page-button" onClick={toPage(numOfPage)}>
        {">>"}
      </div>
    </div>
  );
};

const App = defineComponent((_, { slots }: { slots }) => {
  let keyWord = ref("");
  let docs = ref<PubMed[]>([]);

  let suggest = ref<string[]>([]);
  let page = ref(1);
  let numOfDocPerPage = 10;
  let numOfPage = ref(0);
  let numOfDoc = 0;
  let useStemmer = ref(true);
  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    if (e.target.value != "") {
      keyWord.value = e.target.value;
      fetch(`./keyWord/${keyWord.value}/${useStemmer.value}`)
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then(
          ({
            numOfDoc: _numOfDoc,
            suggest: _suggest,
          }: {
            numOfDoc: number;
            suggest: string[];
          }) => {
            numOfDoc = _numOfDoc;
            suggest.value = _suggest;
            numOfPage.value = Math.ceil(numOfDoc / numOfDocPerPage);
            toPage(1)();
          }
        );
    }
  };

  let showingDoc = ref(-1);

  const toPage = (targetPage: number) => () => {
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > numOfPage.value) {
      targetPage = numOfPage.value;
    }
    page.value = targetPage;
    showingDoc.value = -1;
    if (numOfDoc != 0)
      fetch(
        `./doc/${(page.value - 1) * numOfDocPerPage}/${Math.min(
          page.value * numOfDocPerPage,
          numOfDoc
        )}`
      )
        .then((res) => res.json())
        .then((pubMeds: PubMed[]) => {
          docs.value = pubMeds;
        });
  };
  let matchTarget = ref("");

  let setMatchTarget = (e: InputEvent & { target: HTMLInputElement }) => {
    matchTarget.value = e.target.value;
  };
  const highlight = (text: string, target: string) => {
    if (target == "") {
      return [text];
    } else {
      let { vdom, lastIndex } = [
        ...text.toLowerCase().matchAll(new RegExp(target.toLowerCase(), "g")),
      ].reduce(
        ({ vdom, lastIndex }, curr) => {
          curr.index;
          return {
            vdom: [
              ...vdom,
              text.slice(lastIndex, curr.index),
              <span class="highlight">
                {text.slice(curr.index, curr.index + target.length)}
              </span>,
            ],
            lastIndex: curr.index + target.length,
          };
        },
        { vdom: [], lastIndex: 0 }
      );
      return [...vdom, text.slice(lastIndex)];
    }
  };

  return () => (
    <div class="app">
      <ZipfChart>
        {{
          changeStemmer: (_useStemmer: boolean) =>
            (useStemmer.value = _useStemmer),
        }}
      </ZipfChart>
      <br />
      <input type="text" onChange={search} placeholder="請填入關鍵字" />
      <br style={[suggest.value.length != 0 ? "display:none;" : ""]} />
      <p
        style={[
          suggest.value.length == 0 ? "display:none;" : "",
          "text-align:center;",
        ]}
      >
        目前顯示的是以下字詞的搜尋結果：
        {suggest.value.reduce((prev, word) => {
          if (prev == "") return word;
          else if (word == "") return prev;
          else return `${prev} ${word}`;
        }, "")}
      </p>
      <input
        class="small"
        type="text"
        placeholder="文本搜尋"
        onChange={setMatchTarget}
        style={docs.value.length == 0 ? "display:none;" : ""}
      />
      <br style={docs.value.length == 0 ? "display:none;" : ""} />
      {docs.value.map((doc, idx) => {
        return (
          <>
            <div class="doc">
              <h2 onClick={() => (showingDoc.value = idx)}>
                {highlight(doc.title ?? "", matchTarget.value)}
              </h2>
              <div style={idx != showingDoc.value ? "display:none;" : ""}>
                {doc.abstract.map((abstractText) => {
                  return (
                    <>
                      {abstractText.category != "UNASSIGNED" ? (
                        <h2>{abstractText.category}</h2>
                      ) : (
                        ""
                      )}
                      <p>{highlight(abstractText.text, matchTarget.value)}</p>
                    </>
                  );
                })}
              </div>
            </div>
            <hr />
          </>
        );
      })}
      <br style={docs.value.length == 0 ? "display:none;" : ""} />
      {numOfPage.value != 0
        ? pageListFn(page.value, numOfPage.value, toPage)
        : ""}
      <br />
    </div>
  );
});

createApp(App).mount(document.body);
