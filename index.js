#!/usr/bin/env node
const program = require('commander')
const inquirer = require('inquirer')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const clone = require('./scripts/clone')
program
  .version(pkg.version)

program
  .command('new <project>')
  .description('生成新的weexplus项目')
  .action(project => {
    const targetDir = path.join(process.cwd(), project)
    fs.stat(targetDir, (err, stat) => {
      if (err) {
        startClone(targetDir)
      } else {
        inquirer.prompt([{
          type: 'confirm',
          message: `已存在名为${project}的目录，是否覆盖？`,
          name: 'ok'
        }]).then(answers => {
          if (answers.ok) {
            rimraf(targetDir, () => {
              startClone(targetDir)
            })
          }
        }).catch(console.error)
      }
    })
  })

function startClone (targetDir) {
  fs.mkdirSync(targetDir)
  clone(targetDir).then(() => {
    console.log('项目已生成')
  }).catch(console.error)
}

program.parse(process.argv)
