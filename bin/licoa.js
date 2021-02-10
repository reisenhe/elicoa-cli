#!/usr/bin/env node

//  node.js 命令行解决方案
const { program } = require('commander')

const download = require('../lib/download')

program
  .version(`licoa ${require('../package.json').version}`)
  .command('init <app-name>') // 初始化名称
  .description('初始化项目')
  .action((name) => {
    console.log('hello', name)
  })

program.parse(process.argv) 

console.log(program.args)