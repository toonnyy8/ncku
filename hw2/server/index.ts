import nlp from "compromise";
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
// import session from "koa-session";
import { Parser } from "xml2js";

import { genIdxTable } from "./idx_table";
import { Doc, DocTokenDict, TokenInfo, TokenTable, PubMed } from "./types";
import {
  createTokenDict,
  getDocInfo,
  mergeTokenDict,
  parsePubMedXML,
  buildTokenTable,
  table2json,
  json2table,
  searchTokenTable,
  zipf,
} from "./utils";

nlp.extend(require("compromise-sentences"));

let xmlParser = new Parser({ explicitArray: false });
let datasName = fs.readdirSync(`${__dirname}/../.data/`);
let cached = datasName.find((file) => file == ".docs") != undefined;
let docs: PubMed[];
let tokenDict: { [token: string]: TokenInfo[] };
let table: TokenTable;
if (!cached) {
  docs = datasName.reduce((prev, dataName) => {
    if ((dataName.split(".")?.at(-1) ?? "") == "xml") {
      let xml = fs.readFileSync(`${__dirname}/../.data/${dataName}`, "utf8");
      let pubMeds = parsePubMedXML(xml);
      return [...prev, ...pubMeds];
    }
    return prev;
  }, [] as PubMed[]);

  table = buildTokenTable(docs);

  table2json(table);

  fs.writeFileSync(`${__dirname}/../.data/.docs`, JSON.stringify(docs));
  fs.writeFileSync(
    `${__dirname}/../.data/.token_table`,
    JSON.stringify(table2json(table))
  );
} else {
  docs = JSON.parse(fs.readFileSync(`${__dirname}/../.data/.docs`, "utf8"));
  table = json2table(
    JSON.parse(fs.readFileSync(`${__dirname}/../.data/.token_table`, "utf8"))
  );
}
// console.dir(datas);

let docSet = [] as number[];

const app = new Koa();
const router = new Route();
router
  .get("/", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`${__dirname}/../client/index.html`, "utf8");
    ctx.body = data;
  })
  .get("/build/:path", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`${__dirname}/../client/build/${path}`, "utf8");
    ctx.body = data;
  })
  .get("/zipf", (ctx, next) => {
    ctx.body = zipf(table);
  })
  .get("/keyWord/:keyWord", (ctx, next) => {
    let keyWord: string = ctx.params["keyWord"].toLowerCase();

    docSet = [...searchTokenTable(keyWord, table).values()];
    // if (ctx["session"] != undefined) {
    //   console.dir(ctx["session"]);
    //   ctx["session"]["docSet"] = docSet;
    // }
    console.dir(docSet);
    ctx.body = docSet;
    // // ctx.body = `search doc：${keyWord}`;
    // let tokenInfos = tokenDict[keyWord];
    // let docSet: Set<number> = new Set();
    // for (let tokenInfo of tokenInfos) {
    //   docSet.add(tokenInfo.docIdx);
    // }
    // let docTokenDict: DocTokenDict = {};
    // for (let docIdx of docSet) {
    //   let docTokenInfos = tokenInfos.filter(
    //     (tokenInfo) => tokenInfo.docIdx == docIdx
    //   );
    //   for (let docTokenInfo of docTokenInfos) {
    //     if (docTokenDict[docIdx] == undefined)
    //       docTokenDict[docIdx] = { title: [], content: {} };

    //     if (docTokenInfo.category == "title") {
    //       docTokenDict[docIdx].title.push(docTokenInfo.index);
    //     } else {
    //       let paragraphIdx = Number(docTokenInfo.category.split(":").at(-1));
    //       if (docTokenDict[docIdx].content[paragraphIdx] == undefined)
    //         docTokenDict[docIdx].content[paragraphIdx] = [];

    //       docTokenDict[docIdx].content[paragraphIdx].push(docTokenInfo.index);
    //     }
    //   }
    // }

    // ctx.body = docTokenDict;
    // // let resDoc = {};
    // // for (let tokenInfo of tokenInfos) {
    // //   if (resDoc[tokenInfo.docIdx] == undefined)
    // //     resDoc[tokenInfo.docIdx] = docs[tokenInfo.docIdx];
    // // }
    // // ctx.body = JSON.stringify(Object.values(resDoc));

    // // ctx.body = JSON.stringify(
    // //   tokenInfos.map((tokenInfo) => {
    // //     let title = docs[tokenInfo.docIdx].title;
    // //     let content = [];
    // //     if (tokenInfo.category == "title") {
    // //     } else {
    // //       let paragraphIdx =
    // //       Number(tokenInfo.category.split(":").at(-1)); content = [
    // //         docs[tokenInfo.docIdx].content[paragraphIdx].slice(
    // //           Math.max(0, tokenInfo.index - 0),
    // //           tokenInfo.index + keyWord.length + 20
    // //         ),
    // //       ];
    // //     }
    // //     return { title, content };
    // //     // return docs[tokenInfo.docIdx];
    // //   })
    // // );
    // // console.dir(tokenDict[keyWord]);
  })
  .get("/doc/:start/:end", (ctx, next) => {
    let start = Number(ctx.params["start"]);
    let end = Number(ctx.params["end"]);
    let docIndices = (docSet ?? []).slice(start, end);
    ctx.body = docIndices.map((didx) => docs[didx]);
    // ctx.body = JSON.stringify((docSet ?? []).slice(start, end));
  });

// app.keys = ["some secret hurr"];
//
// const CONFIG = {
//   key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   overwrite: true /** (boolean) can overwrite or not (default true) */,
//   httpOnly: true /** (boolean) httpOnly or not (default true) */,
//   signed: true /** (boolean) signed or not (default true) */,
//   rolling:
//     false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
//   renew:
//     false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
// };

app
  // .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
