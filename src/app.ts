import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { questPrice, questPriceBulk } from "./bOrder.js"

tryDotenv()

const app = new Koa()

app.use(async (ctx, next) => {
  // const result = await questPrice('jtexpress')
  const result = await questPriceBulk()

  ctx.body = result
})

app.listen(process.env.PORT ?? 3333)