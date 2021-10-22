import nlp from "compromise";
import {JSDOM} from "jsdom";
import {Parser} from "xml2js";

import {stemmer} from "./porter";
import {AbstractText, Doc, PubMed, TokenInfo, TokenTable} from "./types";

nlp.extend(require("compromise-sentences"));

export const getDocInfo = (content: string[]) => {
  let charNum = content.reduce((prev, paragraph) => prev + paragraph.length, 0);
  let sentences = content.reduce((prev, paragraph) => {
    return [
      ...prev,
      ...(nlp(paragraph).sentences().json().map(
              (sentence: {text: string}) => sentence["text"]) as string[]),
    ];
  }, [] as string[]);
  let words = sentences.reduce(
      (prev, sentence) => [...prev,
                           ...nlp(sentence).text("reduced").split(/\s+/),
  ],
      [] as string[]);
  let sentenceNum = sentences.length;
  let wordNum = words.length;

  return {charNum, wordNum, sentenceNum};
};

export const createTokenDict = (doc: Doc, docIdx: number) => {
  let tokenDict: {[token: string]: TokenInfo[]} = {};
  for (let token of doc.title.toLowerCase().matchAll(/[a-zA-Z0-9\-]+/g)) {
    if (tokenDict[token[0]] == undefined)
      tokenDict[token[0]] = [];

    tokenDict[token[0]].push({
      docIdx,
      category : "title",
      index : token.index as number,
    });
  }

  for (let [pgIdx, paragraph] of doc.content.entries()) {
    for (let token of paragraph.toLowerCase().matchAll(/[a-zA-Z0-9\-]+/g)) {
      if (tokenDict[token[0]] == undefined)
        tokenDict[token[0]] = [];

      tokenDict[token[0]].push({
        docIdx,
        category : `content:${pgIdx}`,
        index : token.index as number,
      });
    }
  }

  return tokenDict;
};

export const mergeTokenDict =
    (a: {[token: string]: TokenInfo[]}, b: {[token: string]: TokenInfo[]}) => {
      let tokenDict: {[token: string]: TokenInfo[]} = {};

      for (let token in a) {
        tokenDict[token] = [...a[token] ];
      }
      for (let token in b) {
        if (tokenDict[token] == undefined)
          tokenDict[token] = [];
        tokenDict[token] = [...tokenDict[token], ...b[token] ];
      }

      return tokenDict;
    };

interface PubMedJSON {
  PubmedArticleSet: {
    PubmedArticle:
        {MedlineCitation: {ArticleTitle: string[]; Article : string[]}[];}[];
  };
}

export const parsePubMedXML = (xml: string): PubMed[] => {
  let xmlParser = new Parser({});
  let pubmedJson;
  xmlParser.parseString(
      xml, (err: Error, result: object) => { pubmedJson = result; });
  let pubmedArticlesJson: Array<object> =
      pubmedJson?.["PubmedArticleSet"]?.["PubmedArticle"] ?? [];

  return pubmedArticlesJson.map(
      (pubmedArticleJson: {MedlineCitation?: any}) => {
        let articleJson =
            pubmedArticleJson?.["MedlineCitation"]?.[0]?.["Article"]?.[0];

        let title = articleJson?.["ArticleTitle"]?.[0] ?? "";
        let abstractJson = articleJson?.["Abstract"]?.[0]?.["AbstractText"];
        //  console.log(title);
      let abstract = (abstractJson ?? []).map((abstractText: any) => {
      if (typeof abstractText == "object") {
        return {
          category : abstractText?.["$"]?.["NlmCategory"],
          text : abstractText?.["_"],
        };
      }
      return {category : "UNASSIGNED", text : abstractText};
      }) as AbstractText[];

      return {title, abstract};
      });
};

export const buildTokenTable =
    (pubMeds: PubMed[], startDidx?: number, table?: TokenTable): TokenTable => {
      startDidx = startDidx ?? 0;
      table = table ?? {};

      for (let [didx, pubMed] of pubMeds.entries()) {
        for (let [widx, token] of nlp(pubMed.title)
                 .text("reduced")
                 .toLowerCase()
                 .split(" ")
                 .entries()) {
          token = stemmer(token);
          if (table[token] == undefined) {
            table[token] = {};
          }
          let docs = table[token];

          if (docs[`${didx + startDidx}`] == undefined) {
            docs[`${didx + startDidx}`] = {};
          }
          let doc = docs[`${didx + startDidx}`];

          if (doc.title == undefined) {
            doc.title = new Set<number>();
          }
          doc.title.add(widx);
        }
        for (let [aidx, abstractText] of pubMed.abstract.entries()) {
          for (let [widx, token] of nlp(abstractText.text)
                   .text("reduced")
                   .toLowerCase()
                   .split(" ")
                   .entries()) {
            token = stemmer(token);
            if (table[token] == undefined) {
              table[token] = {};
            }
            let docs = table[token];

            if (docs[`${didx + startDidx}`] == undefined) {
              docs[`${didx + startDidx}`] = {};
            }
            let doc = docs[`${didx + startDidx}`];

            if (doc[`${aidx}`] == undefined) {
              doc[`${aidx}`] = new Set<number>();
            }
            doc[`${aidx}`].add(widx);
          }
        }
      }

      return table;
    };

export const levenshteinDistance = (source: string, target: string): number => {
  let distances: number[][] = [
    [
      0,
      ...Array(target.length).fill(0).map((_, idx) => idx + 1),
    ],
  ];
  for (let [i, c1] of source.split("").entries()) {
    distances.push([ i + 1 ]);
    for (let [j, c2] of target.split("").entries()) {
      let ins = distances[i + 1][j] + 1;
      let del = distances[i][j + 1] + 1;
      let sub = distances[i][j] + (c1 == c2 ? 0 : 1);
      distances[i + 1].push(Math.min(ins, del, sub));
    }
  }

  return distances[source.length][target.length];
};

export const searchTokenTable = (w: string, table: TokenTable): Set<number> => {
  let words = nlp(w).text("reduced").toLowerCase().split(" ");
  for (let word of words) {
    let {token, distance} =
        Object.keys(table)
            .map(token =>
                     ({token, distance : levenshteinDistance(word, token)}))
            .reduce((prev, curr) => {
              if (prev.distance < curr.distance) {
                return prev
              } else {
                return curr
              }
            }, {token : "", distance : Infinity})
    table[token]
  }
  return new Set();
};
