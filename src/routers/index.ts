import Router from '@koa/router'
import fs from 'node:fs'
import path from "node:path"
import { fileURLToPath } from "node:url"

export const fileDirPath = path.dirname(fileURLToPath(import.meta.url))

export const router: Router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { message: 'No action for home page' }
})

// DEPRECATED
// import { router as bOrderRouter } from "./bOrder.js"
// router.use('/bOrder', bOrderRouter.routes(), bOrderRouter.allowedMethods())

export const loadRouters = async () => {
  // console.log('fileDirPath', fileDirPath)

  let fileList: string[]
  try {
    const dirFiles = fs.readdirSync(fileDirPath)
    // files.forEach(item => console.log(item))
    fileList = dirFiles.filter(item => !item.startsWith('index.')) // exclude current file (gateway)
    // console.log('fileList: ', fileList)

  } catch (error) {
    console.error(error)
    throw error
  }

  // Import each router file and load child router to root router
  for (let i = 0; i < fileList.length; i++) {
    const filePath = `file://${path.resolve(path.join(fileDirPath, fileList[i]))}`
    const childRouter = await import(filePath)

    router.use(childRouter.path, childRouter.router.routes(), childRouter.router.allowedMethods())
  }
}
