import nlp from "compromise";

import { Doc } from "./types";

nlp.extend(require("compromise-sentences"));
export const genIdxTable = (docs: Doc[]) => {
  for (let doc of docs) {
    let docSentences = doc.content.reduce((prev, paragraph) => {
      return [
        ...prev,
        ...(nlp(paragraph)
          .sentences()
          .json()
          .map((sentence) => sentence["text"] as string) as string[]),
      ];
    }, [] as string[]);
    console.log(docSentences);
  }
};
