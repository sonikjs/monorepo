import { readFileSync, writeFileSync } from 'fs'
import * as path from 'path'
import { afterCreateHook } from '../hook'

const PROJECT_NAME = new RegExp(/%%PROJECT_NAME_.+%%/g)

afterCreateHook.addHook('api', ({ projectName, directoryPath }) => {
  const wranglerPath = path.join(directoryPath, 'wrangler.toml')
  const wrangler = readFileSync(wranglerPath, 'utf-8')
  const rewritten = wrangler.replaceAll(PROJECT_NAME, projectName)
  writeFileSync(wranglerPath, rewritten)
})

afterCreateHook.addHook(['api', 'basic', 'preact', 'react'], ({ directoryPath, projectName }) => {
  const packageJsonPath = path.join(directoryPath, 'package.json')
  const packageJson = readFileSync(packageJsonPath, 'utf-8')
  const rewritten = packageJson.replaceAll(PROJECT_NAME, projectName)
  writeFileSync(packageJsonPath, rewritten)
})

export { afterCreateHook }
