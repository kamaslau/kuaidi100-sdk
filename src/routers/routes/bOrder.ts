import type { Context } from 'koa'
import Router from '@koa/router'
import { price, priceBulk, bOrder } from "../../handlers/bOrder.js"

export const router: Router = new Router()

const name = 'bOrder'
export const path = `/${name}`

const validateParam = (ctx: any) => {
  if (typeof ctx.query.param === 'undefined') {
    ctx.status = 422
    ctx.body = { message: '参数错误' }
    return false
  }
  return true
}

const handleError = (ctx: any, error: unknown) => {
  ctx.status = 500
  ctx.body = { message: (error as Error)?.message }
}

const createHandler = (handler: (input: string) => Promise<any>) => {
  return async (ctx: Context) => {
    if (!validateParam(ctx)) return

    try {
      const result = await handler(ctx.query.param as string)
      ctx.body = result
    } catch (error) {
      handleError(ctx, error)
    }
  }
}

router.get('/price', createHandler(price))
router.get('/priceBulk', createHandler(priceBulk))
router.get('/bOrder', createHandler(bOrder))
