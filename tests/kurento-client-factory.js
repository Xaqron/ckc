/*  global describe it */

const expect = require('chai').expect
const assert = require('chai').assert

const CKC = require('../')
const config = require('./config')
const KurentoClientFactory = CKC.KurentoClientFactory

describe('CKC', function () {
  this.timeout(30000)
  it('Kurento Client', () => {
    return new Promise(async (resolve, reject) => {
      const kurentoClient = await KurentoClientFactory.build(config.kmsUrl)
      assert.ok(kurentoClient, 'initialized')
      expect((kurentoClient.inner.sessionId).length).to.equal(36)
      resolve()
    })
  })
})
