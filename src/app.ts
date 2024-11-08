import Koa from "koa"
import { tryDotenv } from "./libs/init.js"
import { composeParams } from "./libs/auth.js"
import { URLSearchParams } from "node:url"

tryDotenv()

const app = new Koa()

const doFetch = async (url) => fetch(url).then(res => res.json()).catch(error => console.error(error))

const questPrice = async (vendor): Promise<any> => {
  const paramValue = `{"sendManPrintAddr":"山东省威海市乳山市","recManPrintAddr":"辽宁省沈阳市沈北新区","weight":"1","kuaidiCom":"${vendor}"}`

  const params = composeParams(paramValue)
  params.set('param', paramValue)
  params.set('method', 'price')

  const url = new URL('https://poll.kuaidi100.com/order/borderapi.do')
  url.search = params.toString()

  const result = await doFetch(url)
  return result
}

app.use(async (ctx, next) => {
  const result = await questPrice('jtexpress')
  ctx.body = result
})

app.listen(process.env.PORT ?? 3333)