import path from "node:path"
import { fileURLToPath } from "node:url"

const filePath = fileURLToPath(import.meta.url) // THIS file
const fileDir = path.dirname(filePath)
export const BASE_PATH = path.join(fileDir, '../') // root dir

/**
 * 错误处理
 */
export const globalErrorHandler = (error, ctx) => {
  console.error('server error: ', (error as Error)?.message)
}

export const doFetch = async (url: URL) => fetch(url).then(res => res.json()).catch(error => console.error(error))