// 命令行交互接口
const inquirer = require('inquirer')
// node 工具
const fs = require('fs')
const path = require('path')
// 配置与工具
const inquirePrompty = require('./conf/inquirerPrompt')
const templateOpts = require('./conf/templateOpts.json')
const download = require('./utils/download')
const addLoading = require('./utils/addLoading')

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
  await addLoading(download, '正在下载模板...')(projectRoot, tempUrl)
  // 创建完成
  afterBuild()
}

// 检测路径
function checkDir(projectName) {
  return new Promise(async (resolve, reject) => {
    let rootPath = path.resolve(process.cwd())
    let fileList = fs.readdirSync(rootPath)
    // 检测是否存在同名目录
    if (fileList.length) {
      if (fileList.filter(name => {
        const isDir = fs.statSync(name).isDirectory()
        return name === projectName && isDir
      }).length) {
        reject(`项目${projectName}已经存在`)
      }
      resolve(projectName)
    } else 
    // 当目录为空，并且重名
    if (rootName === projectName) {
      let answer = await inquirer.prompt([
        {
          name: 'build',
          message: '当前目录名称与项目名称相同，是否直接在当前目录创建项目',
          type: 'confirm',
          default: true
        }
      ])
      resolve(answer.build ? '.' : projectName)
    } else {
      resolve(projectName)
    }
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
    let choices = Object.values(templateOpts).map(item => {
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
      let { url } = templateOpts[selectTemp]
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