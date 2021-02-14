
// 命令行交互接口
const inquirer = require('inquirer')
// node 工具
const fs = require('fs')
const path = require('path')
// 配置与工具
const inquirePrompty = require('./conf/inquirerPrompt')
const download = require('./utils/download')
const templateOptions = require('./conf/templateOptions.json')

let rootName = path.basename(process.cwd())

async function create(projectName) {
  let projectRoot // 项目路径
  let template // 模板名称
  // 检测路径
  projectRoot = await checkDir(projectName)
  // 创建路径
  makeDir(projectRoot)
  // 选择模板
  let tempUrl = await selectTemplate()
  // 下载模板
  template = await download(projectRoot, tempUrl)
  // 创建完成
  afterBuild()
}
// 检测路径
function checkDir(projectName) {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      name: 'buildNow',
      message:
        '现在就要创建咯',
      type: "list",
      choices: [
        '是啊',
        '是啊赶紧的'
      ]
    }).then((ans) => {
      console.log(`现在就要创建咯, ${ans.buildNow}`)
      resolve(projectName)
    })
  })
}

// 创建路径
function makeDir(pathName) {
  if (pathName !== '.') {
    fs.mkdirSync(pathName)
  }
}
// 模板选择
function selectTemplate() {
  return new Promise((resolve, reject) => {
    let choices = Object.values(templateOptions).map(item => {
      return {
        name: item.name,
        value: item.value
      }
    })
    inquirer.prompt({
      type: 'list',
      message: '请选择要创建的项目类型',
      name: 'selectTemp',
      choices: [
        ...choices
      ]
    }).then(data => {
      let { selectTemp } = data
      let { url } = templateOptions[selectTemp]
      resolve(url)
    })
  })
}
// 成功创建后执行
function afterBuild() {
  console.log('创建成功')
}
// 失败后执行
function afterError(e) {
  console.log('创建失败', e)
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    afterError(err)
  })
}