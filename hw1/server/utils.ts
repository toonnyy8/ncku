import { Doc } from "./types";
import nlp from "compromise";
nlp.extend(require("compromise-sentences"));

export const getDocInfo = (content: string[]) => {
  let charNum = content.reduce((prev, paragraph) => prev + paragraph.length, 0);
  let sentences = content.reduce((prev, paragraph) => {
    return [
      ...prev,
      ...(nlp(paragraph)
        .sentences()
        .json()
        .map((sentence) => sentence["text"] as string) as string[]),
    ];
  }, [] as string[]);
  let sentenceNum = sentences.length;
  let wordNum = sentences.reduce(
    (prev, sentence) => prev + sentence.split(" ").length,
    0
  );

  return { charNum, wordNum, sentenceNum };
};

export const createTokenDict = (content: string[], tokenDict) => {};
