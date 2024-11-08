import Koa from "koa"
import { verifyDotenv } from "./libs/init.js"

verifyDotenv()

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = "ok"
})

app.listen(process.env.PORT ?? 3333)