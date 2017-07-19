const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
// const app = new Koa();
const app = module.exports = new Koa();

// "database"

const posts = [];

// middlewares

app.use(koaBody());

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

app.use(ctx => {
  ctx.body = 'Hello World';
});

router.post('/post', create);

/**
 * Create a post.
 */

async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  console.log(111, posts.length);
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

app.use(router.routes());

if (!module.parent) app.listen(3001);
