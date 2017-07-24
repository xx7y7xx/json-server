const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const json = require('koa-json');
// const debug = require('debug')('json-server');
const low = require('lowdb');
// const app = new Koa();
const app = module.exports = new Koa();

// middlewares

// A body parser middleware, support multipart, urlencoded and json request bodies
app.use(koaBody());
// JSON pretty-printed response middleware
app.use(json());

// x-response-time

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

router.get('/', ctx => {
  ctx.body = 'json-server';
});

router.post('/ficloud/project/query', create);

async function create(ctx) {
  const db = low(`./ficloud/project/query/post.json`);

  const resObj = {
    __fake_server__: true
  };

  // 为啥isEmpty返回的是Boolean对象?
  if (!db.isEmpty().valueOf()) {
    let body = db.value();
    // debug('body: %s', JSON.stringify(body));
    Object.assign(resObj, body);
  } else {
    resObj.success = false;
    resObj.message = '对应路径的JSON文件不存在！';
  }
  ctx.body = resObj;
}

app.use(router.routes());

if (!module.parent) app.listen(3001);
