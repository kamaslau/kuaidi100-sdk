import Router from '@koa/router'

import { router as bOrderRouter } from "./bOrder.js"

export const router: Router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { message: 'No action for home page' }
})

router.use('/bOrder', bOrderRouter.routes(), bOrderRouter.allowedMethods())
