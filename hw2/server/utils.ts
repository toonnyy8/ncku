import nlp from "compromise";
import { JSDOM } from "jsdom";
import { Parser } from "xml2js";

import { Doc, PubMed, TokenInfo, AbstractText } from "./types";

nlp.extend(require("compromise-sentences"));

export const getDocInfo = (content: string[]) => {
  let charNum = content.reduce((prev, paragraph) => prev + paragraph.length, 0);
  let sentences = content.reduce((prev, paragraph) => {
    return [
      ...prev,
      ...(nlp(paragraph)
        .sentences()
        .json()
        .map((sentence: { text: string }) => sentence["text"]) as string[]),
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

    tokenDict[token[0]].push({
      docIdx,
      category: "title",
      index: token.index as number,
    });
  }

  for (let [pgIdx, paragraph] of doc.content.entries()) {
    for (let token of paragraph.toLowerCase().matchAll(/[a-zA-Z0-9\-]+/g)) {
      if (tokenDict[token[0]] == undefined) tokenDict[token[0]] = [];

      tokenDict[token[0]].push({
        docIdx,
        category: `content:${pgIdx}`,
        index: token.index as number,
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

interface PubMedJSON {
  PubmedArticleSet: {
    PubmedArticle: {
      MedlineCitation: { ArticleTitle: string[]; Article: string[] }[];
    }[];
  };
}

export const parsePubMedXML = (xml: string): PubMed[] => {
  let xmlParser = new Parser({});
  let pubmedJson;
  xmlParser.parseString(xml, (err: Error, result: object) => {
    pubmedJson = result;
  });
  let pubmedArticlesJson: Array<object> =
    pubmedJson?.["PubmedArticleSet"]?.["PubmedArticle"] ?? [];

  return pubmedArticlesJson.map(
    (pubmedArticleJson: { MedlineCitation?: any }) => {
      let articleJson =
        pubmedArticleJson?.["MedlineCitation"]?.[0]?.["Article"]?.[0];

      let title = articleJson?.["ArticleTitle"]?.[0] ?? "";
      let abstractJson = articleJson?.["Abstract"]?.[0]?.["AbstractText"];
      //  console.log(title);
      let abstract = (abstractJson ?? []).map((abstractText: any) => {
        if (typeof abstractText == "object") {
          return {
            category: abstractText?.["$"]?.["NlmCategory"],
            text: abstractText?.["_"],
          };
        }
        return { category: "UNASSIGNED", text: abstractText };
      }) as AbstractText[];

      return { title, abstract };
    }
  );
};
