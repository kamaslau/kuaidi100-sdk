import Koa from "koa"
import { tryDotenv } from "./libs/init.js"

tryDotenv()

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = "ok"
})

app.listen(process.env.PORT ?? 3333)