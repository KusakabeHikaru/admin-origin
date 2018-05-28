'use strict'
require('./check-versions')()

// ora --- 实现nodejs控制台的loading效果
const ora = require('ora')
// node环境下的rm -rf的命令库
const rm = require('rimraf')
const path = require('path')

// 控制台文字颜色控制
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
// 在build时引入的是 'prod'的偶尔、、配置
const webpackConfig = require('./webpack.prod.conf')

// Ajax在请求是会破坏浏览器的前进后退功能，故使用pushstate-server可以修补Ajax的问题
const server = require('pushstate-server')

var spinner = ora('building for '+ process.env.env_config+ ' environment...' )
spinner.start()

// 删除已编译的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    if(process.env.npm_config_preview){
      server.start({
          port: 9526,
          directory: './dist',
          file: '/index.html'
      });
      console.log('> Listening at ' +  'http://localhost:9526' + '\n')
    }
  })
})
