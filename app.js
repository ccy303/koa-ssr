const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const ssrRender = require('./util/render');

const router = new Router();
const app = new Koa();

router.get('/', async ctx => {
  ctx.body = ctx.render('home');
});

app
  .use(ssrRender({
    manifest: path.join(__dirname, 'dist/manifest.json'),
  }))
  .use(router.routes());

app.listen(8000, () => {
  console.info(`server is runing at 8000`)
});
