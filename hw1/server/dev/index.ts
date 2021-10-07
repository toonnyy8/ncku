import nlp from "compromise"
import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
import {Parser} from "xml2js"
import {Data} from "./types"

nlp.extend(require("compromise-sentences"))

let xmlParser = new Parser({explicitArray : false})

xmlParser.parseString('<root>hi</root>', (err, result) => {console.dir(result)})
let datasName = fs.readdirSync(`${__dirname}/.data/`)
let cached = datasName.find(file => file == ".cache") != undefined
let datas: Data[];
if (!cached) {
  datas = datasName.reduce((prev, dataName) => {
    switch (dataName.split('.').at(-1)) {
    case "json": {
      let data: Array<{tweet_text : string}> =
          JSON.parse(fs.readFileSync(`${__dirname}/.data/${dataName}`, "utf8"))
      return [
        ...prev,
        ...data.map(({tweet_text}) => ({title : "", content : [ tweet_text ]}))
      ]
    }
    case "xml": {

      let data: any
      xmlParser.parseString(
          fs.readFileSync(`${__dirname}/.data/${dataName}`, "utf8"),
          (err, result) => {data = result})
      return [
        ...prev,
        ...data["PubmedArticleSet"]["PubmedArticle"].map(
            ({MedlineCitation}) => {
              let article = MedlineCitation["Article"];
              let abstrsctText = article?.["Abstract"]?.["AbstractText"];
              let content: string[] = [];

              if (typeof abstrsctText == "object") {
                content = abstrsctText.map(({_}) => _)
              } else if (typeof abstrsctText == "string") {
                content = [ abstrsctText ]
              }
              return {
                title: MedlineCitation["Article"]["ArticleTitle"], content
              }
            })
      ]
    }
    default: {
      return prev
    }
    }
  }, [])

  fs.writeFileSync(`${__dirname}/.data/.cache`, JSON.stringify(datas))
} else {
  datas = JSON.parse(fs.readFileSync(`${__dirname}/.data/.cache`, "utf8"))
}
// let cache = fs.readFileSync(`${__dirname}/.data/.cache`, "utf8");
console.dir(datas)
// let jsonData = JSON.parse(cache)

const app = new Koa();
const router = new Route();
router
    .get("/",
         (ctx, next) => {
           let path: string = ctx.params["path"];
           let data = fs.readFileSync(`${__dirname}/client/index.html`, "utf8");
           ctx.body = data;
         })
    .get("/src/:path",
         (ctx, next) => {
           let path: string = ctx.params["path"];
           let data =
               fs.readFileSync(`${__dirname}/client/src/${path}`, "utf8");
           ctx.body = data;
         })
    .get("/keyWord/:keyWord", (ctx, next) => {
      let keyWord: string = ctx.params["keyWord"];
      ctx.body = `search doc：${keyWord}`;
    });
app;
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
