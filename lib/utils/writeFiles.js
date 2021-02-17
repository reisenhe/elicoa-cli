const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

/**
 * 使用 ejs 写入文件
 * @param {String} file 文件路径 
 * @param {Object} options ejs选项
 * @param {String} target 目标写入文件 
 */
module.exports = (file, options, target) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(file, options, {}, (err, data) => {
      fs.writeFile(target, data, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })
}