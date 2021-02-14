#!/usr/bin/env node

// node.js 命令行解决方案
const { program } = require('commander')

program
  .version(`licoa ${require('../package.json').version}`)
  .command('create <app-name>') // 初始化名称
  .description('初始化项目')
  .action((name) => {
    require('../lib/create')(name)
  })

program.parse(process.argv) 