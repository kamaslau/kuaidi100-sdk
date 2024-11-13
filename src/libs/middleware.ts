import Koa from 'koa'

export const auth: Koa.Middleware = async (ctx, next) => {
  if (String(process.env.TOKEN)?.length < 10) {
    ctx.status = 503
    ctx.body = { message: 'Service Unavailable; Server config has not been completed yet' }

    if (process.env.NODE_ENV !== 'production') console.error('Change TOKEN value in .env file first')

  } else if (ctx.query?.token !== process.env.TOKEN) {
    ctx.status = 401
    ctx.body = { message: 'Unauthorized' }

  } else {
    await next()
  }
}