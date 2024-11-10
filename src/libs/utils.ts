/**
 * 错误处理
 */
export const globalErrorHandler = (error, ctx) => {
  console.error('server error: ', (error as Error)?.message)
}

export const doFetch = async (url: URL) => fetch(url).then(res => res.json()).catch(error => console.error(error))