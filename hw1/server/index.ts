import nlp from "compromise";
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
import { Parser } from "xml2js";

import { genIdxTable } from "./idx_table";
import { Doc, DocTokenDict, TokenInfo } from "./types";
import { createTokenDict, getDocInfo, mergeTokenDict } from "./utils";

nlp.extend(require("compromise-sentences"));

let xmlParser = new Parser({ explicitArray: false });
let datasName = fs.readdirSync(`${__dirname}/.data/`);
let cached = datasName.find((file) => file == ".docs") != undefined;
let docs: Doc[];
let tokenDict: { [token: string]: TokenInfo[] };
if (!cached) {
  docs = datasName.reduce((prev, dataName) => {
    switch (dataName.split(".").at(-1)) {
      case "json": {
        let data: Array<{ tweet_text: string }> = JSON.parse(
          fs.readFileSync(`${__dirname}/.data/${dataName}`, "utf8")
        );
        return [
          ...prev,
          ...data.map(({ tweet_text }) => ({
            title: "",
            content: [tweet_text],
            ...getDocInfo([tweet_text]),
          })),
        ];
      }
      case "xml": {
        let data: any;
        xmlParser.parseString(
          fs.readFileSync(`${__dirname}/.data/${dataName}`, "utf8"),
          (err, result) => {
            data = result;
          }
        );
        if (data["PubmedArticleSet"]["PubmedArticle"].map == undefined) {
          let MedlineCitation =
            data["PubmedArticleSet"]["PubmedArticle"]["MedlineCitation"];

          let article = MedlineCitation["Article"];
          let abstrsctText = article?.["Abstract"]?.["AbstractText"];
          let content: string[] = [];

          if (typeof abstrsctText == "object") {
            content = abstrsctText.map(({ _ }) => _);
          } else if (typeof abstrsctText == "string") {
            content = [abstrsctText];
          }
          let docInfo = getDocInfo(content);
          return [
            ...prev,
            {
              title: MedlineCitation["Article"]["ArticleTitle"],
              content,
              ...docInfo,
            },
          ];
        }

        return [
          ...prev,
          ...data["PubmedArticleSet"]["PubmedArticle"].map(
            ({ MedlineCitation }) => {
              let article = MedlineCitation["Article"];
              let abstrsctText = article?.["Abstract"]?.["AbstractText"];
              let content: string[] = [];

              if (typeof abstrsctText == "object") {
                content = abstrsctText.map(({ _ }) => _);
              } else if (typeof abstrsctText == "string") {
                content = [abstrsctText];
              }
              let docInfo = getDocInfo(content);
              return {
                title: MedlineCitation["Article"]["ArticleTitle"],
                content,
                ...docInfo,
              };
            }
          ),
        ];
      }

      default: {
        return prev;
      }
    }
  }, []);
  tokenDict = docs.reduce((prev, doc, docIdx) => {
    return mergeTokenDict(prev, createTokenDict(doc, docIdx));
  }, {} as { [token: string]: TokenInfo[] });

  fs.writeFileSync(`${__dirname}/.data/.docs`, JSON.stringify(docs));
  fs.writeFileSync(`${__dirname}/.data/.token_dict`, JSON.stringify(tokenDict));
} else {
  docs = JSON.parse(fs.readFileSync(`${__dirname}/.data/.docs`, "utf8"));
  tokenDict = JSON.parse(
    fs.readFileSync(`${__dirname}/.data/.token_dict`, "utf8")
  );
}
// console.dir(datas);

const app = new Koa();
const router = new Route();
router
  .get("/", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`${__dirname}/client/index.html`, "utf8");
    ctx.body = data;
  })
  .get("/src/:path", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`${__dirname}/client/src/${path}`, "utf8");
    ctx.body = data;
  })
  .get("/keyWord/:keyWord", (ctx, next) => {
    let keyWord: string = ctx.params["keyWord"].toLowerCase();
    // ctx.body = `search doc：${keyWord}`;
    let tokenInfos = tokenDict[keyWord];
    let docSet: Set<number> = new Set();
    for (let tokenInfo of tokenInfos) {
      docSet.add(tokenInfo.docIdx);
    }
    let docTokenDict: DocTokenDict = {};
    for (let docIdx of docSet) {
      let docTokenInfos = tokenInfos.filter(
        (tokenInfo) => tokenInfo.docIdx == docIdx
      );
      for (let docTokenInfo of docTokenInfos) {
        if (docTokenDict[docIdx] == undefined)
          docTokenDict[docIdx] = { title: [], content: {} };

        if (docTokenInfo.category == "title") {
          docTokenDict[docIdx].title.push(docTokenInfo.index);
        } else {
          let paragraphIdx = Number(docTokenInfo.category.split(":").at(-1));
          if (docTokenDict[docIdx].content[paragraphIdx] == undefined)
            docTokenDict[docIdx].content[paragraphIdx] = [];

          docTokenDict[docIdx].content[paragraphIdx].push(docTokenInfo.index);
        }
      }
    }

    ctx.body = docTokenDict;
    // let resDoc = {};
    // for (let tokenInfo of tokenInfos) {
    //   if (resDoc[tokenInfo.docIdx] == undefined)
    //     resDoc[tokenInfo.docIdx] = docs[tokenInfo.docIdx];
    // }
    // ctx.body = JSON.stringify(Object.values(resDoc));

    // ctx.body = JSON.stringify(
    //   tokenInfos.map((tokenInfo) => {
    //     let title = docs[tokenInfo.docIdx].title;
    //     let content = [];
    //     if (tokenInfo.category == "title") {
    //     } else {
    //       let paragraphIdx =
    //       Number(tokenInfo.category.split(":").at(-1)); content = [
    //         docs[tokenInfo.docIdx].content[paragraphIdx].slice(
    //           Math.max(0, tokenInfo.index - 0),
    //           tokenInfo.index + keyWord.length + 20
    //         ),
    //       ];
    //     }
    //     return { title, content };
    //     // return docs[tokenInfo.docIdx];
    //   })
    // );
    // console.dir(tokenDict[keyWord]);
  })
  .get("/doc/:docIdx", (ctx, next) => {
    ctx.body = JSON.stringify(docs[ctx.params["docIdx"]]);
  });
app;
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
