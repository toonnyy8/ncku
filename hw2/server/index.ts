import nlp from "compromise";
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
// import session from "koa-session";

import { TokenTable, PubMed } from "./types";
import {
  parsePubMedXML,
  buildTokenTable,
  table2json,
  json2table,
  searchTokenTable,
  zipf,
} from "./utils";

nlp.extend(require("compromise-sentences"));

let datasName = fs.readdirSync(`${__dirname}/../.data/`);
let cached = datasName.find((file) => file == ".docs") != undefined;
let docs: PubMed[];
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

    console.dir(docSet);
    ctx.body = docSet;
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
