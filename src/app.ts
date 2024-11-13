import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { auth } from "./libs/middleware.js"
import { globalErrorHandler } from "./libs/utils.js"
import { router } from './routers.js'
import { BASE_PATH } from "./libs/utils.js"

console.log(BASE_PATH)

tryDotenv()

const app = new Koa()

app.on('error', globalErrorHandler)

app.use(auth)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.PORT ?? 3333)
