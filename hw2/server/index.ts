import nlp from "compromise";
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";

// import session from "koa-session";

import { PubMed, TokenTable } from "./types";
import {
  buildTokenTable,
  json2table,
  parsePubMedXML,
  searchTokenTable,
  table2json,
  zipf,
} from "./utils";

nlp.extend(require("compromise-sentences"));

let datasName = fs.readdirSync(`${__dirname}/../.data/`);
let cached = datasName.find((file) => file == ".docs") != undefined;
let docs: PubMed[];
let table: TokenTable;
let unStemmerTable: TokenTable;
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
  unStemmerTable = buildTokenTable(docs, undefined, undefined, false);

  table2json(table);

  fs.writeFileSync(`${__dirname}/../.data/.docs`, JSON.stringify(docs));
  fs.writeFileSync(
    `${__dirname}/../.data/.token_table`,
    JSON.stringify(table2json(table))
  );
  fs.writeFileSync(
    `${__dirname}/../.data/.unstemmer_token_table`,
    JSON.stringify(table2json(unStemmerTable))
  );
} else {
  docs = JSON.parse(fs.readFileSync(`${__dirname}/../.data/.docs`, "utf8"));
  table = json2table(
    JSON.parse(fs.readFileSync(`${__dirname}/../.data/.token_table`, "utf8"))
  );
  unStemmerTable = json2table(
    JSON.parse(
      fs.readFileSync(`${__dirname}/../.data/.unstemmer_token_table`, "utf8")
    )
  );
}

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
  .get("/zipf/:useStemmer", (ctx, next) => {
    if (ctx.params["useStemmer"] == "true") {
      ctx.body = zipf(table);
    } else {
      ctx.body = zipf(unStemmerTable);
    }
  })
  .get("/keyWord/:keyWord/:useStemmer", (ctx, next) => {
    let keyWord: string = ctx.params["keyWord"].toLowerCase();
    let _docSet: Set<number>, suggest: string[];
    if (ctx.params["useStemmer"] == "true") {
      ({ docSet: _docSet, suggest } = searchTokenTable(keyWord, table));
    } else {
      ({ docSet: _docSet, suggest } = searchTokenTable(
        keyWord,
        unStemmerTable,
        false
      ));
    }

    docSet = [..._docSet.values()];

    ctx.body = { numOfDoc: docSet.length, suggest };
  })
  .get("/doc/:start/:end", (ctx, next) => {
    let start = Number(ctx.params["start"]);
    let end = Number(ctx.params["end"]);
    let docIndices = (docSet ?? []).slice(start, end);
    ctx.body = docIndices.map((didx) => docs[didx]);
  });

app.use(router.routes()).use(router.allowedMethods());

console.log("http://localhost:3000/");
app.listen(3000);
