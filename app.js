const Koa = require('koa');
const Router = require('koa-router');
const ssrRender = require('./util/render');

const router = new Router();
const app = new Koa();

router.get('/', async ctx => {
  ctx.body = ctx.render('home.js');
});

app.use(ssrRender()).use(router.routes());

app.listen(8000);
