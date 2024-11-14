import { composeParams } from "./libs/auth.js"
import { doFetch } from "./libs/utils.js"
import { vendors } from "./dicts.js"

const urls = {
  production: 'https://poll.kuaidi100.com/order/borderapi.do',
  sandbox: 'https://api.kuaidi100.com/apiMock/border'
}

const paramSample = {
  price: {
    kuaidiCom: 'jtexpress',
    sendManPrintAddr: "山东省威海市乳山市",
    recManPrintAddr: "北京北京市海淀区",
    weight: 1,
  },
  bOrder: {
    kuaidiCom: 'jtexpress',
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
  },
}

export const price = async (input: string = '') => {
  // if (!vendors.some(item => item.value === vendor)) throw Error('not valid vendor')

  if (input.length === 0 && process.env.NODE_ENV === 'development') input = JSON.stringify(paramSample.price)

  const params: URLSearchParams = composeParams(input)
  params.set('param', input)
  params.set('method', 'price')

  const url = new URL(urls.production)
  url.search = params.toString()

  const result = await doFetch(url)
  // console.log('result: ', Date.now(), result)
  return result
}

// TODO improve efficiency
export const priceBulk = async (input: string = '') => {
  // console.log('priceBulk: ', input)

  const inputObject = (input.length === 0 && process.env.NODE_ENV === 'development') ? paramSample.price : JSON.parse(input)

  const inputs = vendors.map(item => JSON.stringify({ ...inputObject, kuaidiCom: item.value }))

  const requests = inputs.map(item => price(item))
  const results = await Promise.all(requests)

  const result = results.filter(item => item.message === '成功').map(item => item.data).sort((a, b) => a.price - b.price)
  // console.log('result: ', Date.now(), result)
  return result
}

// TODO
export const bOrder = async (input: string = '') => {
  // console.log('bOrder: ', input)

  if (input.length === 0 && process.env.NODE_ENV === 'development') input = JSON.stringify(paramSample.bOrder)

  const params: URLSearchParams = composeParams(input)
  params.set('param', input)
  params.set('method', 'bOrder')

  const url = new URL(urls.production)
  url.search = params.toString()

  const result = await doFetch(url)
  // console.log('result: ', Date.now(), result)
  return result
}
