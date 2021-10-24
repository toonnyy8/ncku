import noUiSlider from "nouislider";

import {
  createApp,
  ref,
  defineComponent,
  h,
  Fragment,
  Ref,
  onMounted,
} from "vue";
import { TokenInfo, Doc, DocTokenDict, TextWithAttr } from "./types";
import { Chart } from "@antv/g2";

let searchSubString = (searchStr: string, str: string): number[] => {
  let indices: number[] = [];
  if (searchStr.length == 0) return indices;

  let idx = -1;
  while (true) {
    idx = str.indexOf(searchStr, idx + 1);
    if (idx == -1) return indices;
    indices.push(idx);
  }
};

const ZipfChart = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  const tokenNum = ref(1);
  const range = ref({ min: 1, max: 1 });
  let zipf: { token: string; count: number }[] = [];
  onMounted(() => {
    fetch(`./zipf`)
      .then((res) => res.json())
      .then((zipfData: { token: string; count: number }[]) => {
        zipf = zipfData;
        tokenNum.value = zipf.length;
        range.value = {
          min: Math.ceil(tokenNum.value * 0.05),
          max: Math.ceil(tokenNum.value * 0.25),
        };

        chart = new Chart({
          container: chartRef.value,
          autoFit: true,
          height: 300,
        });

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

const Doc = defineComponent((_, { slots }: { slots }) => {
  return () => {
    return (
      <div class="doc">
        <h1>{slots.title() ?? ""}</h1>
        {slots.content().map((paragraph) => {
          return <p>{paragraph}</p>;
        })}
        <span>Number of Characters: {slots.charNum()}</span>
        <br />
        <span>Number of Words: {slots.wordNum()}</span>
        <br />
        <span>Number of Sentences: {slots.sentenceNum()}</span>
      </div>
    );
  };
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
  let docs = ref<
    {
      title: any[];
      content: any[][];
      charNum: number;
      wordNum: number;
      sentenceNum: number;
    }[]
  >([
    {
      title: ["Hi"],
      content: [["hello"]],
      charNum: 1,
      wordNum: 1,
      sentenceNum: 1,
    },
  ]);

  let getDoc = (docIdx: number, docTokenDict: DocTokenDict) => {
    return fetch(`./doc/${docIdx}`)
      .then((res) => res.json())
      .then((doc: Doc) => {
        let { lastIndex: titleLastIndex, texts: titleTexts } = docTokenDict[
          docIdx
        ].title.reduce(
          ({ lastIndex, texts }, index) => {
            texts = [
              ...texts,
              doc.title.slice(lastIndex, index),
              <span class="highlight">
                {doc.title.slice(index, index + keyWord.value.length)}
              </span>,
            ];

            return { lastIndex: index + keyWord.value.length, texts };
          },
          { lastIndex: 0, texts: [] }
        );
        titleTexts.push(doc.title.slice(titleLastIndex));
        let content = [];
        for (let [pIdx, paragraph] of doc.content.entries()) {
          let pp = docTokenDict[docIdx].content[pIdx];
          if (pp == undefined) {
            content[pIdx] = [paragraph];
          } else {
            let { lastIndex: paragraphLastIndex, texts: paragraphTexts } =
              pp.reduce(
                ({ lastIndex, texts }, index) => {
                  texts = [
                    ...texts,
                    <span>{paragraph.slice(lastIndex, index)}</span>,
                    <span class="highlight">
                      {paragraph.slice(index, index + keyWord.value.length)}
                    </span>,
                  ];

                  return {
                    lastIndex: index + keyWord.value.length,
                    texts,
                  };
                },
                { lastIndex: 0, texts: [] }
              );
            paragraphTexts.push(
              <span>{paragraph.slice(paragraphLastIndex)}</span>
            );
            content[pIdx] = paragraphTexts;
          }
        }
        docs.value = [
          ...docs.value,
          {
            title: titleTexts,
            content,
            charNum: doc.charNum,
            wordNum: doc.wordNum,
            sentenceNum: doc.sentenceNum,
          },
        ];
        return;
      });
  };
  let docSet: number[];
  let page = ref(1);
  let numOfDocPerPage = 20;
  let numOfPage = ref(0);
  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    keyWord.value = e.target.value;
    fetch(`./keyWord/${keyWord.value}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((response: number[]) => {
        docSet = response;
        numOfPage.value = Math.ceil(docSet.length / numOfDocPerPage);
        toPage(1)();
        // docs.value = [];
        // let funcs = [];
        // for (let docIdx of Object.keys(docTokenDict)) {
        //   funcs.push(() => getDoc(Number(docIdx), docTokenDict));
        // }
        // funcs.reduce((p, f) => p.then(f), Promise.resolve());
      });
  };

  const toPage = (targetPage: number) => () => {
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > numOfPage.value) {
      targetPage = numOfPage.value;
    }
    page.value = targetPage;
    if (docSet.length != 0)
      fetch(
        `./doc/${(page.value - 1) * numOfDocPerPage}/${Math.min(
          page.value * numOfDocPerPage,
          docSet.length
        )}`
      )
        .then((res) => res.json())
        .then((res) => console.log(res));
  };
  return () => (
    <div class="app">
      <ZipfChart></ZipfChart>
      <br />
      <input
        type="text"
        onChange={search}
        value={keyWord.value}
        placeholder="請填入關鍵字"
      />
      <br />
      {docs.value.map((doc) => {
        return (
          <>
            <Doc>
              {{
                title: () => doc.title,
                content: () => doc.content,
                charNum: () => doc.charNum,
                wordNum: () => doc.wordNum,
                sentenceNum: () => 1,
              }}
            </Doc>
            <hr />
          </>
        );
      })}
      {numOfPage.value != 0
        ? pageListFn(page.value, numOfPage.value, toPage)
        : ""}
    </div>
  );
});

createApp(App).mount(document.body);
