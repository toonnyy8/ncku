import nlp from "compromise";
import { Parser } from "xml2js";

import { AbstractText, PubMed } from "./types";

nlp.extend(require("compromise-sentences"));

interface PubMedJSON {
  PubmedArticleSet: {
    PubmedArticle: {
      MedlineCitation: { ArticleTitle: string[]; Article: string[] }[];
    }[];
  };
}

export const parsePubMedXML = (xml: string): PubMed[] => {
  let xmlParser = new Parser({});
  let pubmedJson = {} as PubMedJSON;
  xmlParser.parseString(xml, (_: Error, result: PubMedJSON) => {
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
