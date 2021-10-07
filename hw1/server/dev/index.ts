import fs from "fs";
import Koa from "koa";
import Route from "koa-router";
// const Koa = require("koa");
const app = new Koa();
const router = new Route();
router
  .get("/", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`../../client/index.html`, "utf8");
    ctx.body = data;
  })
  .get("/build/:path", (ctx, next) => {
    let path: string = ctx.params["path"];
    let data = fs.readFileSync(`../../client/build/${path}`, "utf8");
    ctx.body = data;
  })
  .get("/keyWord/:keyWord", (ctx, next) => {
    let keyWord: string = ctx.params["keyWord"];
    ctx.body = `search doc：${keyWord}`;
  });
app;
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
