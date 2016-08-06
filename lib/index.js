var DEFAULTS = require('./defaults')

module.exports = function ievms (options) {
  options = Object.assign({}, DEFAULTS, options)
  var args = [ 'curl -s', options.host, '|' ]
  if (Object.keys(options).length > 1) {
    args.push('env')
    if (options.versions && options.versions.length) {
      args.push('IEVMS_VERSIONS="' + options.versions.join(' ') + '"')
    }
    if (options.path) {
      args.push('INSTALL_PATH="' + options.path + '"')
    }
    if (options.curl) {
      args.push('CURL_OPTS="' + options.curl.join(' ') + '"')
    }
  }
  args.push('bash')
  return args.join(' ')
}
