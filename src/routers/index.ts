import type { Context } from 'koa'
import Router from '@koa/router'
import { readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const router = new Router()

// Root path
router.get('/', (ctx: Context) => {
  ctx.body = { message: 'No action for home page' }
})

type RouterModule = {
  path: string
  router: Router
}

const loadRouterModule = async (filePath: string): Promise<void> => {
  try {
    const { path: routePath, router: childRouter } = await import(filePath) as RouterModule
    if (!routePath || !childRouter) {
      throw new Error(`Invalid router module: ${filePath}`)
    }
    router.use(routePath, childRouter.routes(), childRouter.allowedMethods())
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load router module ${filePath}: ${error.message}`)
    }
    throw error
  }
}

export const loadRouters = async (): Promise<void> => {
  const fileDirPath = dirname(fileURLToPath(import.meta.url))
  const basePath = `file://${resolve(fileDirPath)}`

  try {
    const dirFiles = await readdir(fileDirPath)
    const routerLoadPromises: Promise<void>[] = []

    for (const file of dirFiles) {
      if (file.startsWith('index.')) continue
      routerLoadPromises.push(loadRouterModule(`${basePath}/${file}`))
    }

    await Promise.all(routerLoadPromises)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Failed to load routers:', errorMessage)
    throw error
  }
}
