#!/usr/bin/env node
var DEFAULTS = require('../lib/defaults')
var fetch = require('node-fetch')
var chalk = require('chalk')
var pkg = require('../package.json')
var program = require('commander')
var spawn = require('child_process').spawn
var ievms = require('../lib')

program
  .version(pkg.version)
  .option('-v, --versions [versions]', 'add a version of IE to be installed (see https://github.com/xdissent/ievms for a full list)', collect, [])
  .option('-p, --path [path]', 'specify the install path')
  .option('-c, --curl-option [curl]', 'specify curl options, e.g. --limit-rate 50k')
  .option('-d, --dry [dry]', 'log installation command and exit')
  .parse(process.argv)

var cmd = ievms(program)

console.log(chalk.green(cmd))

if (program.dry) process.exit()

fetch(DEFAULTS.host)
  .then(function (res) {
    return res.text()
  })
  .then(exec)
  .catch(console.error)

function exec (script) {
  var child = spawn('/bin/bash', {
    env: extend({}, process.env, {
      IEVMS_VERSIONS: program.versions.join(' '),
      INSTALL_PATH: program.path || null,
      CURL_OPTS: program.curl || null
    })
  })

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  child.on('exit', function (code) {
    console.log('...the end!')
    process.exit()
  })

  child.stdin.write(script)
}

function extend (obj) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) obj[key] = arguments[i][key]
  }
  return obj
}

function collect (val, memo) {
  memo.push(val)
  return memo
}
