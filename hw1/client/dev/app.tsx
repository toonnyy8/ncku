import { createApp, ref, defineComponent, h, Fragment } from "vue";

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

const KeyWord = defineComponent((_, { slots }: { slots }) => {
  let keyWord = ref("hi!");
  let index = ref([]);

  const txt_file = "Attention is all you need！";
  const processed_txt = txt_file.toLowerCase();
  let wordBook = [];
  let str = "";
  for (let i = 0; i < processed_txt.length; i++) {
    if (processed_txt[i] >= "a" && processed_txt[i] <= "z") {
      str += processed_txt[i];
    } else if (processed_txt[i] != " ") {
      wordBook.push(str);
      str = processed_txt[i];
    }
  }
  if (str != "" && str != " ") wordBook;

  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    keyWord.value = e.target.value;
    index.value = searchSubString(keyWord.value.toLowerCase(), processed_txt);
    fetch(`./keyWord/${keyWord.value}`)
      .then((res) => res.text())
      .catch((err) => console.error(err))
      .then((response) => console.log(response));
  };

  return () => (
    <>
      <input onChange={search} value={keyWord.value} />
      <br />
      {txt_file}
      <br />
      char:{" "}
      {index.value.length == 0
        ? "not found"
        : `[${index.value.reduce((prev, curr) => prev + curr + ", ", "")}]`}
      <br />
      word: {}
    </>
  );
});

let app = (
  <>
    <KeyWord />
    <br />
  </>
);

createApp(KeyWord).mount(document.body);
