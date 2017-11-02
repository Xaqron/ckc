/*  global describe it */

const expect = require('chai').expect
const assert = require('chai').assert

const CKC = require('../')
const config = require('./config')
const KurentoClientFactory = CKC.KurentoClientFactory

describe('CKC', function () {
  this.timeout(45000)
  it('MediaPipeline', () => {
    return new Promise(async (resolve, reject) => {
      const kurentoClient = await KurentoClientFactory.build(config.kmsUrl)
      let mediaPipeLine = await kurentoClient.createMediaPipeline()
      assert.ok(mediaPipeLine, 'Media pipeline')
      expect((mediaPipeLine.inner.id).length).to.equal(58)
      mediaPipeLine.dispose()
      resolve()
    })
  })
})
