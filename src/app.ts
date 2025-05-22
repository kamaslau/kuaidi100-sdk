import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { auth } from "./libs/middleware.js"
import { globalErrorHandler } from "./libs/utils.js"
import { router, loadRouters } from './routers/index.js'

console.time('startUp')
tryDotenv()

const app = new Koa()

app.on('error', globalErrorHandler)

app.use(auth)

await loadRouters()
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT ?? 3333)
console.timeEnd('startUp')
