// Global setup
require('dotenv').config();
const debug: any = require('debug')('service:app');

// Third party imports
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as Koa from 'koa';
const app:Koa = new Koa();

// My imports
import { parentRouter } from './routes';

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(bodyParser());
app.use(json());

// Route middleware
app.use(parentRouter.routes());
app.use(parentRouter.allowedMethods());

app.use(async (ctx:Koa.Context) => (ctx.body = { msg: 'Hello Service!' }));

// Application error logging.
app.on('error', console.error);

export default app;
