import { createHash } from "node:crypto"

export const composeSign = (params: string, time: string) => {
  const rawString = params + time + `${process.env.KEY}${process.env.SECRET}`
  // console.log('rawString: ', rawString)

  // MD5
  const sign = createHash('md5').update(rawString).digest('hex').toUpperCase()

  // console.log('sign: ', sign)
  return sign
}

export const composeParams = (params: string): URLSearchParams => {
  // console.log(params)

  const time = String(Date.now())

  const sign = composeSign(params, time)

  // Append common request params
  const searchParams = new URLSearchParams()
  searchParams.append('sign', sign);
  searchParams.append('t', time);
  searchParams.append('key', process.env.KEY as string);

  return searchParams
}