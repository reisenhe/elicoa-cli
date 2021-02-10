const download = require('download-git-repo')

module.exports = (target, url) => {
    return new Promise((resolve, reject) => {
        download(`direct:${url}`,
        target, { clone: true }, 
        (err) => {
            console.log('下载失败', err)
        })
    })
}