const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./routes');

const app = new Koa();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;