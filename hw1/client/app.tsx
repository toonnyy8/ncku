import { createApp, ref, defineComponent, h, Fragment } from "vue";
import { TokenInfo, Doc, DocTokenDict, TextWithAttr } from "./types";

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

const App = defineComponent((_, { slots }: { slots }) => {
  let keyWord = ref("hi!");
  let docs = ref<
    {
      title: any[];
      content: any[][];
      charNum: number;
      wordNum: number;
      sentenceNum: number;
    }[]
  >([]);

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
  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    keyWord.value = e.target.value;
    fetch(`./keyWord/${keyWord.value}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((docTokenDict: DocTokenDict) => {
        docs.value = [];
        let funcs = [];
        for (let docIdx of Object.keys(docTokenDict)) {
          funcs.push(() => getDoc(Number(docIdx), docTokenDict));
        }
        funcs.reduce((p, f) => p.then(f), Promise.resolve());
      });
  };
  return () => (
    <div class="app">
      <input onChange={search} value={keyWord.value} />
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
                sentenceNum: () => doc.sentenceNum,
              }}
            </Doc>
            <hr />
          </>
        );
      })}
    </div>
  );
});

createApp(App).mount(document.body);
