const Koa = require('koa');
// const app = new Koa();
const app = module.exports = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
