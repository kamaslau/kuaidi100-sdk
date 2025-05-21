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
  const basePath = `file://${resolve(fileDirPath)}`

  try {
    const dirFiles = await readdir(fileDirPath)
    const routerLoadPromises: Promise<void>[] = []

    for (const file of dirFiles) {
      if (file.startsWith('index.')) continue

      routerLoadPromises.push(
        (async () => {
          const filePath = `${basePath}/${file}`
          const { path: routePath, router: childRouter } = await import(filePath)
          router.use(routePath, childRouter.routes(), childRouter.allowedMethods())
        })()
      )
    }

    await Promise.all(routerLoadPromises)
  } catch (error) {
    console.error('Failed to load routers: ', error)
    throw error
  }
}
