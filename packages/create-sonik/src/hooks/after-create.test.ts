import * as path from 'path'
import { describe, expect, it, vi } from 'vitest'
import { afterCreateHook } from './after-create'

describe('afterCreateHook', () => {
  it('Should update wrangler.toml and package.json with the correct project name', async () => {
    vi.mock('fs', () => {
      return {
        readFileSync: vi.fn().mockImplementation((filePath) => {
          switch (filePath) {
            case path.join('/path/to/test/directory', 'wrangler.toml'):
              return 'name = "%%PROJECT_NAME%%"'
            case path.join('/path/to/test/directory', 'package.json'):
              return '{"name": "%%PROJECT_NAME%%"}'
            default:
              throw new Error(`File not found: ${filePath}`)
          }
        }),
        writeFileSync: vi.fn(),
      }
    })

    afterCreateHook.applyHook('api', {
      projectName: 'my-app',
      directoryPath: '/path/to/test/directory',
    })

    const { writeFileSync } = await import('fs')
    expect(writeFileSync).toHaveBeenCalledWith(
      path.join('/path/to/test/directory', 'wrangler.toml'),
      'name = "my-app"'
    )
    expect(writeFileSync).toHaveBeenCalledWith(
      path.join('/path/to/test/directory', 'package.json'),
      '{"name": "my-app"}'
    )

    vi.restoreAllMocks()
  })
})
