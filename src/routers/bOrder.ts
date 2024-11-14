import Router from '@koa/router'
import { price, priceBulk } from "../bOrder.js"

export const router: Router = new Router()

export const name = 'bOrder'
export const path = `/${name}`

router.get('/price', async (ctx) => {
  try {
    const vendor = ctx.query.vendor?.toString() ?? 'jtexpress' // Use jtexpress as example
    const result = await price(vendor)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})

router.get('/priceBulk', async (ctx) => {
  try {
    const result = await priceBulk()
    ctx.body = result

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})
