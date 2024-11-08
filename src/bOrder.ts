import { composeParams } from "./libs/auth.js"
import { doFetch } from "./libs/utils.js"
import { vendors } from "./dicts.js"

export const questPrice = async (vendor: string) => {
  const paramValue = `{"sendManPrintAddr":"山东省威海市乳山市","recManPrintAddr":"辽宁省沈阳市沈北新区","weight":"1","kuaidiCom":"${vendor}"}`

  const params = composeParams(paramValue)
  params.set('param', paramValue)
  params.set('method', 'price')

  const url = new URL('https://poll.kuaidi100.com/order/borderapi.do')
  url.search = params.toString()

  const result = await doFetch(url)
  // console.log('result: ', Date.now(), result)
  return result
}

export const questPriceBulk = async () => {
  const requests = vendors.map(item => questPrice(item.value))
  const results = await Promise.all(requests)

  const result = results.filter(item => item.message === '成功').map(item => item.data).sort((a, b) => a.price - b.price)
  // console.log('result: ', Date.now(), result)
  return result
}