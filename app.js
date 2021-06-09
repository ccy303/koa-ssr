const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const ssrRender = require('./util/render');
const koaStatic = require('koa-static');
const router = new Router();
const app = new Koa();

router.get('/', async ctx => {
  ctx.body = ctx.render('home.js', { a: "ccy", msg: "你好呀" });
});

app
  .use(koaStatic('dist', {}))
  .use(
    ssrRender({
      manifest: path.join(__dirname, 'dist/manifest.json'),
    }),
  )
  .use(router.routes());

// 监听端口
app.listen(8888, () => {
  console.info(`server is runing at 8888`);
});
