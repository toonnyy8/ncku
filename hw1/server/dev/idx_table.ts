import nlp from "compromise"

import {Data} from "./types"

nlp.extend(require("compromise-sentences"))
export const fn = (datas: Data[]) => {
  for (let data of datas) {
    let dataSentences = data.content.reduce(
        (prev, paragraph) => {return [
          ...prev, ...nlp(paragraph).sentences().join().map(
                       (sentence) => sentence["text"] as string) as string[]
        ]},
        [] as string[])
    console.log(dataSentences)
  }
}
