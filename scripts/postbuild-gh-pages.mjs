import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const indexHtml = join(dist, 'index.html')
const notFound = join(dist, '404.html')

copyFileSync(indexHtml, notFound)
console.log('postbuild: dist/404.html <- index.html (SPA fallback for GitHub Pages)')
