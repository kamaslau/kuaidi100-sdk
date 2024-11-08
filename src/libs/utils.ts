import { ServerResponse } from "node:http"

/**
 * 错误处理
 */
export const globalErrorHandler = (error, ctx) => {
  console.error('server error: ', (error as Error)?.message)
}

export const doFetch = async (url) => fetch(url).then(res => res.json()).catch(error => console.error(error))