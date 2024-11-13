import Router from '@koa/router'
import { questPrice, questPriceBulk } from "./bOrder.js"

export const router: Router = new Router()

router.use('/', async (ctx) => {
  ctx.body = { message: 'No action for home page' }
})

router.use('/questPrice', async (ctx) => {
  try {
    const vendor = ctx.query.vendor?.toString() ?? 'jtexpress' // Use jtexpress as example
    const result = await questPrice(vendor)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }

    return
  }
})

router.use('/questPriceBulk', async (ctx) => {
  try {
    const result = await questPriceBulk()
    ctx.body = result

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }

    return
  }
})
