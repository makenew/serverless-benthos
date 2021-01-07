import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import download from 'download'
import mkdirp from 'mkdirp'

import { loadJson } from './index.js'

const tmpRoot = 'tmp'

const install = async () => {
  const { benthos } = await loadJson('package.json')
  const { name, data, checksums } = await get(benthos)
  verify(name, checksums, data)
  await write(name, data)
  return { name }
}

const get = async (benthos) => {
  const root = `${benthos.src}/v${benthos.version}`
  const name = `${benthos.name}_${benthos.version}_${benthos.platform}.zip`

  const [data, checksums] = await Promise.all([
    download(`${root}/${name}`),
    download(`${root}/benthos_${benthos.version}_checksums.txt`)
  ])

  return { name, data, checksums }
}

const verify = (name, checksums, data) => {
  const checksum = checksums
    .toString()
    .split('\n')
    .find((s) => s.endsWith(name))
    .split('  ')[0]

  const sha = crypto.createHash('sha256').update(data).digest('hex')
  if (checksum !== sha) {
    throw new Error(
      `Failed to verify sha256 for ${name}. Expected ${checksum}, got ${sha}`
    )
  }
}

const write = async (name, data) => {
  const root = path.resolve(tmpRoot)
  const dst = path.resolve(root, name)
  await mkdirp(root)
  await fs.promises.writeFile(dst, data)
}

const handleError = (err) => {
  console.error(err)
  process.exit(1)
}

const handleDone = ({ name, checksum }) => {
  console.log(`Verified ${path.resolve(tmpRoot, name)}`)
}

install().then(handleDone).catch(handleError)
