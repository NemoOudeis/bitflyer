const YAML = require('yaml')
const fs = require('fs').promises

const writeYamlFile = async (path, content) => await fs.writeFile(path, YAML.stringify(content))

const exists = async (path) => {
    const result = await fs.stat(path).catch(_ => false)

    return !result ? result : true
}

const mkdir = async (path) => {
    if(! await exists(path)) {
        await fs.mkdir(path)
    }
}

const readYamlFile = async (path) => YAML.parse(await fs.readFile(path, 'utf-8'))

module.exports = {
    ...fs,
    writeYamlFile,
    readYamlFile,
    mkdir
}