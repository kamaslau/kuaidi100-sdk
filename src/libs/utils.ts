import path from "node:path"
import { fileURLToPath } from "node:url"
import Koa from 'koa'

const filePath = fileURLToPath(import.meta.url) // THIS file
const fileDirPath = path.dirname(filePath)
export const BASE_PATH = path.join(fileDirPath, '../') // root dir

/**
 * 错误处理
 */
export const globalErrorHandler = (error: Error, ctx: Koa.Context) => {
  console.error('server error: ', (error as Error)?.message)
}

export const doFetch = async (url: URL) => fetch(url).then(res => res.json()).catch((error: Error) => globalErrorHandler)
