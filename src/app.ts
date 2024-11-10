import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { globalErrorHandler } from "./libs/utils.js"
import { questPrice, questPriceBulk } from "./bOrder.js"

tryDotenv()

const app = new Koa()

app.on('error', globalErrorHandler)

app.use(async (ctx, next) => {
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
})

app.use(async (ctx, next) => {
  console.log(ctx.path)

  try {
    if (ctx.path === '/questPrice') {
      const vendor = ctx.query.vendor?.toString() ?? 'jtexpress' // Use jtexpress as example
      const result = await questPrice(vendor)
      ctx.body = result

    } else if (ctx.path === '/questPriceBulk') {
      const result = await questPriceBulk()
      ctx.body = result
    }

  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error)?.message }

    return
  }
})

app.listen(process.env.PORT ?? 3333)