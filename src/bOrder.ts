import { composeParams } from "./libs/auth.js"
import { doFetch } from "./libs/utils.js"
import { vendors } from "./dicts.js"

const urls = {
  production: 'https://poll.kuaidi100.com/order/borderapi.do',
  sandbox: 'https://api.kuaidi100.com/apiMock/border'
}

export const questPrice = async (vendor: string) => {
  if (!vendors.some(item => item.value === vendor)) throw Error('not valid vendor')

  const paramValue = `{"sendManPrintAddr":"山东省威海市乳山市","recManPrintAddr":"北京北京市海淀区","weight":"1","kuaidiCom":"${vendor}"}`

  const params: URLSearchParams = composeParams(paramValue)
  params.set('param', paramValue)
  params.set('method', 'price')

  const url = new URL(urls.production)
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