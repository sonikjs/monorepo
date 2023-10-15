async function api(endpoint: string) {
  const response = await fetch(`https://api.github.com/repos/${endpoint}`)
  const data: { message: string } | { path: string; type: string }[] = await response.json()
  return data
}

type Options = {
  user: string
  repository: string
  ref: string
  directory: string
}

export async function viaContentsApi({ user, repository, ref = 'HEAD', directory }: Options) {
  const files: string[] = []
  const contents = await api(`${user}/${repository}/contents/${directory}?ref=${ref}`)

  if ('message' in contents) {
    if (contents.message === 'Not Found') {
      return []
    }
    if (contents.message) {
      throw new Error(contents.message)
    }
  }

  if (Array.isArray(contents)) {
    for (const item of contents) {
      if (item.type === 'file') {
        files.push(item.path)
      } else if (item.type === 'dir') {
        files.push(item.path)
      }
    }
  }

  return files
}
