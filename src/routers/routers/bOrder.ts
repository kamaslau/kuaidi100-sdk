import Router from '@koa/router'
import { price, priceBulk, bOrder } from "../bOrder.js"

export const router: Router = new Router()

export const name = 'bOrder'
export const path = `/${name}`

router.get('/price', async (ctx) => {
  // console.log('/price', ctx.query)

  if (typeof ctx.query.param === 'undefined') {
    ctx.status = 422
    ctx.body = { message: '参数错误' }

    return
  }
  const input = ctx.query.param as string

  try {
    const result = await price(input)
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})

router.get('/priceBulk', async (ctx) => {
  // console.log('/priceBulk', ctx.query)

  if (typeof ctx.query.param === 'undefined') {
    ctx.status = 422
    ctx.body = { message: '参数错误' }

    return
  }
  const input = ctx.query.param as string

  try {
    const result = await priceBulk(input)
    ctx.body = result

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})

router.get('/bOrder', async (ctx) => {
  // console.log('/bOrder', ctx.query)

  if (typeof ctx.query.param === 'undefined') {
    ctx.status = 422
    ctx.body = { message: '参数错误' }

    return
  }
  const input = ctx.query.param as string

  try {
    const result = await bOrder(input)
    ctx.body = result

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }
  }
})
