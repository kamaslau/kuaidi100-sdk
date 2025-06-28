import Koa from "koa"
import { auth } from "./libs/middleware.js"
import { globalErrorHandler } from "./libs/utils.js"
import { router, loadRouters } from './routers/index.js'

console.time('startUp')

const app = new Koa()

app.on('error', globalErrorHandler)

app.use(auth)

await loadRouters()
app.use(router.routes()).use(router.allowedMethods())

app.listen(process.env.PORT ?? 3333)
console.timeEnd('startUp')
