import nlp from "compromise";
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
import { Parser } from "xml2js";
import { Doc } from "./types";
import { genIdxTable } from "./idx_table";
import { getDocInfo } from "./utils";

nlp.extend(require("compromise-sentences"));

let xmlParser = new Parser({ explicitArray: false });
let datasName = fs.readdirSync(`${__dirname}/.data/`);
// let cached = datasName.find((file) => file == ".cache") != undefined;
let cached = false; // datasName.find((file) => file == ".cache") != undefined;
let docs: Doc[];
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
            docInfo: getDocInfo([tweet_text]),
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
  let idxTable = genIdxTable(docs);
  fs.writeFileSync(`${__dirname}/.data/.cache`, JSON.stringify(docs));
} else {
  docs = JSON.parse(fs.readFileSync(`${__dirname}/.data/.cache`, "utf8"));
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
    let keyWord: string = ctx.params["keyWord"];
    ctx.body = `search doc：${keyWord}`;
  });
app;
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
