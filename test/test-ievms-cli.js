var expect = require('chai').expect
var ievms = require('../lib')

describe('ievms cli', function () {
  it('should translate versions to env variables', function () {
    expect(ievms({
      host: 'host',
      versions: ['9', 'EDGE']
    })).to.eql('curl -s host | env IEVMS_VERSIONS="9 EDGE" bash')
  })

  it('should translate install path', function () {
    expect(ievms({
      host: 'host',
      path: '/tmp'
    })).to.eql('curl -s host | env INSTALL_PATH="/tmp" bash')
  })

  it('should handle multiple options', function () {
    expect(ievms({
      host: 'host',
      versions: ['9'],
      path: '/tmp'
    })).to.eql('curl -s host | env IEVMS_VERSIONS="9" INSTALL_PATH="/tmp" bash')
  })

  it('should handle curl options', function () {
    expect(ievms({
      host: 'host',
      curl: ['--limit-rate 50k']
    })).to.eql('curl -s host | env CURL_OPTS="--limit-rate 50k" bash')
  })

  it('should handle no options', function () {
    expect(ievms({
      host: 'host'
    })).to.eql('curl -s host | bash')
  })

  it('should have the correct default host', function () {
    expect(ievms()).to.eql('curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | bash')
  })
})
