import * as Router from 'koa-router';

import { Controller } from './controllers/controller.controller';

const parentRouter: Router = new Router({ prefix: '/' });
const router: Router = new Router({ prefix: '/' });

router.get('/:param', Controller.get);

parentRouter.use(
    router.routes(),
    router.allowedMethods(),
);

export { parentRouter };
