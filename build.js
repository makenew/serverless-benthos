import { createArtifactsFrom, loadJson } from './index.js'

const createArtifacts = createArtifactsFrom({
  tmpRoot: 'tmp',
  configRoot: 'config',
  distRoot: 'dist'
})

loadJson('package.json')
  .then(({ benthos }) => benthos)
  .then(createArtifacts)
  .then((artifacts) => {
    for (const { outputPath } of artifacts) {
      console.log(`Built artifact: ${outputPath}`)
    }
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
