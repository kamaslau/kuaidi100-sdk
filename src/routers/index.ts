import Router from '@koa/router'
import { readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { message: 'No action for home page' }
})

export const loadRouters = async (): Promise<void> => {
  const fileDirPath = dirname(fileURLToPath(import.meta.url))

  try {
    const dirFiles = await readdir(fileDirPath)

    const routerLoadPromises = dirFiles.reduce<Promise<void>[]>((promises, file) => {
      if (!file.startsWith('index.')) {
        promises.push((async () => {
          const filePath = `file://${resolve(join(fileDirPath, file))}`
          const { path: routePath, router: childRouter } = await import(filePath)
          router.use(routePath, childRouter.routes(), childRouter.allowedMethods())
        })())
      }
      return promises
    }, [])

    await Promise.all(routerLoadPromises)
  } catch (error) {
    console.error('Failed to load routers: ', error)
    throw error
  }
}
