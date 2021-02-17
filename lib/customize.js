const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const rewritePkg = require('./utils/rewritePkg')
const writeFiles = require('./utils/writeFiles')

const store = require('./store')

module.exports = async (projectPath) => {
  let packagePath = path.resolve(projectPath, 'package.json')
  const remove = await configAsk(projectPath)
  // 修改项目名称
  const pkgJson = { name: projectPath }
  rewritePkg(packagePath, pkgJson, remove)
}

// 配置询问
async function configAsk (projectPath) {
  // 要移除的依赖
  let removeDev = {};
  // vue 模板相关配置
  if (store.selectTemp !== 'vue') {
    return
  }
  let question = [
    {
      name: 'mock',
      message: '是否使用 mock',
      type: 'confirm',
      default: true
    }
  ]
  let { mock } = await inquirer.prompt(question)
  let tplPath = path.resolve(__dirname, 'templates/vue/main.js.ejs')
  let target = path.resolve(projectPath, 'src/main.js')
  writeFiles(tplPath, {
    mock
  }, target)
  // 不使用 mock
  if (!mock) {
    // 移除 mock 文件夹
    let mockPath = path.resolve(projectPath, 'src/mock')
    let fileList = fs.readdirSync(mockPath)
    if (fileList.length) {
      fileList.forEach(file => {
        let filePath = path.resolve(mockPath, file)
        fs.unlinkSync(filePath)
      })
    }
    fs.rmdirSync(mockPath)
    removeDev = {
      devDependencies: ['mockjs']
    }
  }
  return removeDev
}