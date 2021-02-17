const fs = require('fs')

/**
 * 修改 package.json
 * @param {String} packagePath 目标路径 
 * @param {Object} data 增加参数
 * @param {Object} rm 移除参数
 */
module.exports = (packagePath, data, rm) => {
  let package = JSON.parse(fs.readFileSync(packagePath))
  package = Object.assign(package, data)
  if (rm) {
    for (let key in rm) {
      for (let i in rm[key]) {
        let prop = rm[key][i]
        delete package[key][prop]
      }
    }
  }
  let packageStr = JSON.stringify(package, null, 2)
  fs.writeFileSync(packagePath, packageStr)
}