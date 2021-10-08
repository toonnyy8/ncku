import { createApp, ref, defineComponent, h, Fragment } from "vue";
import { TokenInfo, Doc } from "./types";

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
  return () => (
    <div class="doc">
      <h1>{slots.title()}</h1>
      {slots.content().map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      {["a", "b", "c"]}
    </div>
  );
});

const App = defineComponent((_, { slots }: { slots }) => {
  let keyWord = ref("hi!");
  let docs = ref([]);

  //  const txt_file = "Attention is all you need！";
  //  const processed_txt = txt_file.toLowerCase();
  //  let wordBook = [];
  //  let str = "";
  //  for (let i = 0; i < processed_txt.length; i++) {
  //    if (processed_txt[i] >= "a" && processed_txt[i] <= "z") {
  //      str += processed_txt[i];
  //    } else if (processed_txt[i] != " ") {
  //      wordBook.push(str);
  //      str = processed_txt[i];
  //    }
  //  }
  //  if (str != "" && str != " ") wordBook;

  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    keyWord.value = e.target.value;
    // index.value = searchSubString(keyWord.value.toLowerCase(), processed_txt);
    fetch(`./keyWord/${keyWord.value}`)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((tokenInfos: TokenInfo[]) => {
        // console.log(tokenInfos);
        let contentTokenIndices: {
          [docIdx: number]: {
            [paragraphIdx: number]: number[];
          };
        } = {};

        let docsTokenInfos: {
          [docIdx: number]: {
            index: number;
            category: "title" | `content:${number}`;
          }[];
        } = {};

        for (let tokenInfo of tokenInfos) {
          if (contentTokenIndices[tokenInfo.docIdx] == undefined) {
            contentTokenIndices[tokenInfo.docIdx] = {};
          }
          if (docsTokenInfos[tokenInfo.docIdx] == undefined) {
            docsTokenInfos[tokenInfo.docIdx] = [];
          }
          docsTokenInfos[tokenInfo.docIdx].push({
            index: tokenInfo.index,
            category: tokenInfo.category,
          });
        }
        for (let docIdx of Object.keys(docsTokenInfos)) {
          docsTokenInfos[Number(docIdx)].sort((a, b) => {
            return b.index - a.index;
          });
          fetch(`./doc/${docIdx}`)
            .then((res) => res.json())
            .then((doc: Doc) => {
              docs.value.push(doc);
            });
        }
        console.log(docsTokenInfos);
      });
  };
  return () => (
    <div class="app">
      <input onChange={search} value={keyWord.value} />
      <br />
      {docs.value.map((doc) => {
        return (
          <>
            <Doc>{{ title: () => doc.title, content: () => doc.content }}</Doc>
            <hr />
          </>
        );
      })}
    </div>
  );
});

let app = (
  <>
    <App />
    <br />
    <Doc />
  </>
);

createApp(App).mount(document.body);
