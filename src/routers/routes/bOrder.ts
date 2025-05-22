import type { Context } from 'koa'
import Router from '@koa/router'
import { price, priceBulk, bOrder } from "../../handlers/bOrder.js"

const name = 'bOrder'
export const path = `/${name}`
export const router: Router = new Router()

interface ErrorResponse {
  message: string;
  code?: string;
}

interface SuccessResponse<T> {
  data: T;
  message?: string;
}

const validateParam = (ctx: Context): boolean => {
  const param = ctx.query.param

  if (typeof param === 'undefined' || param === '') {
    ctx.status = 422
    ctx.body = {
      message: '参数错误'
    } as ErrorResponse
    return false
  }
  return true
}

const handleError = (ctx: Context, error: unknown): void => {
  const errorResponse: ErrorResponse = {
    message: error instanceof Error ? error.message : '未知错误',
    code: 'INTERNAL_ERROR'
  }

  ctx.status = 500
  ctx.body = errorResponse
}

const createHandler = <T>(handler: (input: string) => Promise<T>) => {
  return async (ctx: Context): Promise<void> => {
    if (!validateParam(ctx)) return

    try {
      const result = await handler(ctx.query.param as string)
      const response: SuccessResponse<T> = {
        data: result,
        message: '操作成功'
      }
      ctx.body = response
    } catch (error) {
      handleError(ctx, error)
    }
  }
}

// Register routes
router.get('/price', createHandler(price))
router.get('/priceBulk', createHandler(priceBulk))
router.get('/bOrder', createHandler(bOrder))
