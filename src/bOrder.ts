import { composeParams } from "./libs/auth.js"
import { doFetch } from "./libs/utils.js"
import { vendors } from "./dicts.js"

const urls = {
  production: 'https://poll.kuaidi100.com/order/borderapi.do',
  sandbox: 'https://api.kuaidi100.com/apiMock/border'
}

export const price = async (vendor: string) => {
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

export const priceBulk = async () => {
  const requests = vendors.map(item => questPrice(item.value))
  const results = await Promise.all(requests)

  const result = results.filter(item => item.message === '成功').map(item => item.data).sort((a, b) => a.price - b.price)
  // console.log('result: ', Date.now(), result)
  return result
}

// TODO
export const bOrder = async (vendor: string) => {
  if (!vendors.some(item => item.value === vendor)) throw Error('not valid vendor')

  const paramSample = {
    kuaidiCom: vendor,
    recManName: '',
    recManMobile: '',
    recManPrintAddr: '',
    sendManName: '',
    sendManMobile: '',
    sendManPrintAddr: '',
    callBackUrl: 'https://www.kamaslau.com/',
    cargo: '物品',
    weight: 1, // KG
    dayType: "今天" // 今天/明天/后天
  }
  const paramValue = JSON.stringify(paramSample)

  const params: URLSearchParams = composeParams(paramValue)
  params.set('param', paramValue)
  params.set('method', 'bOrder')

  const url = new URL(urls.production)
  url.search = params.toString()

  const result = await doFetch(url)
  // console.log('result: ', Date.now(), result)
  return result
}
