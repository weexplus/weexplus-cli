const download = require('download-git-repo')
const ora = require('ora')

const TEMPLATE_REPO = 'tj/commander.js'

module.exports = function clone (targetDir) {
  return new Promise(function (resolve, reject) {
    const spinner = ora('正在下载模板')
    spinner.start()
    download(TEMPLATE_REPO, targetDir, { clone: true }, err => {
      spinner.stop()
      if (err) {
        reject()
      } else {
        resolve()
      }
    })
  })
}
