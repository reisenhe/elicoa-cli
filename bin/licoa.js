#!/usr/bin/env node

// node.js 命令行解决方案
const { program } = require('commander')
// 命令行交互接口
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

// 配置与工具
const download = require('../lib/download')
const inquirePrompty = require('../conf/inquirerPrompt')

program
  .version(`licoa ${require('../package.json').version}`)
  .command('init <app-name>') // 初始化名称
  .description('初始化项目')
  .action((name) => {
    console.log('hello', name)
  })

program.parse(process.argv) 

let projectName = program.args[1]
if (!projectName) {
  program.help()
  return
}

let rootName = path.basename(process.cwd())

main();
async function main() {
  let projectRoot // 项目路径
  let template // 模板名称
  try {
    projectRoot = await checkDir()
    makeDir(projectRoot)
    let tempUrl = 'https://github.com/reisenhe/typescript-study.git#main'
    template = await download(projectRoot, tempUrl)
    afterBuild()
  } catch (e) {
    afterError(e)
  }
}
// 检测路径
function checkDir() {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        name: 'buildNow',
        message: 
          '现在就要创建咯',
        type: "list",
        choices: [
          '是啊',
          '是啊赶紧的'
        ]
      }
    ]).then((ans) => {
      console.log(`现在就要创建咯, ${ans.buildNow}`)
      resolve(projectName)
    })
  })
}

// 创建路径
function makeDir(pathName) {
  if (pathName !== '.') {
    fs.mkdirSync(projectName)
  }
}

function afterBuild() {
  console.log('创建成功')
}
function afterError(e) {
  console.log('创建失败', e)
}