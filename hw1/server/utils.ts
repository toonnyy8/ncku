import nlp from "compromise";

import { Doc, TokenInfo } from "./types";

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
  let words = sentences.reduce(
    (prev, sentence) => [
      ...prev,
      ...nlp(sentence).text("reduced").split(/\s+/),
    ],
    [] as string[]
  );
  let sentenceNum = sentences.length;
  let wordNum = words.length;

  return { charNum, wordNum, sentenceNum };
};

export const createTokenDict = (doc: Doc, docIdx: number) => {
  let tokenDict: { [token: string]: TokenInfo[] } = {};
  for (let token of doc.title.toLowerCase().matchAll(/[a-zA-Z0-9\-]+/g)) {
    if (tokenDict[token[0]] == undefined) tokenDict[token[0]] = [];

    tokenDict[token[0]].push({ docIdx, category: "title", index: token.index });
  }

  for (let [pgIdx, paragraph] of doc.content.entries()) {
    for (let token of paragraph.toLowerCase().matchAll(/[a-zA-Z0-9\-]+/g)) {
      if (tokenDict[token[0]] == undefined) tokenDict[token[0]] = [];

      tokenDict[token[0]].push({
        docIdx,
        category: `content:${pgIdx}`,
        index: token.index,
      });
    }
  }

  return tokenDict;
};

export const mergeTokenDict = (
  a: { [token: string]: TokenInfo[] },
  b: { [token: string]: TokenInfo[] }
) => {
  let tokenDict: { [token: string]: TokenInfo[] } = {};

  for (let token in a) {
    tokenDict[token] = [...a[token]];
  }
  for (let token in b) {
    if (tokenDict[token] == undefined) tokenDict[token] = [];
    tokenDict[token] = [...tokenDict[token], ...b[token]];
  }

  return tokenDict;
};
