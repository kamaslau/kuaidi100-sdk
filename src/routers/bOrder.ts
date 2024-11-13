import Router from '@koa/router'
import { questPrice, questPriceBulk } from "../bOrder.js"

export const router: Router = new Router()

export const name = 'bOrder'
export const path = `/${name}`

router.get('/questPrice', async (ctx) => {
  try {
    const vendor = ctx.query.vendor?.toString() ?? 'jtexpress' // Use jtexpress as example
    const result = await questPrice(vendor)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})

router.get('/questPriceBulk', async (ctx) => {
  try {
    const result = await questPriceBulk()
    ctx.body = result

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})
