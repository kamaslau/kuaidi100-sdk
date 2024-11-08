import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { globalErrorHandler } from "./libs/utils.js"
import { questPrice, questPriceBulk } from "./bOrder.js"

tryDotenv()

const app = new Koa()

app.on('error', globalErrorHandler)

app.use(async (ctx, next) => {
  // console.log(ctx.path)

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
  }
})

app.listen(process.env.PORT ?? 3333)