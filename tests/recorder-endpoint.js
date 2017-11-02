/*  global describe it */

const expect = require('chai').expect
const assert = require('chai').assert

const CKC = require('../')
const config = require('./config')
const WebRtcEndpoint = CKC.WebRtcEndpoint
const RecorderEndpoint = CKC.RecorderEndpoint
const KurentoClientFactory = CKC.KurentoClientFactory

describe('CKC', function () {
  this.timeout(60000)
  it('WebRtc Endpoint', () => {
    return new Promise(async (resolve, reject) => {
      const kurentoClient = await KurentoClientFactory.build(config.kmsUrl)
      let mediaPipeLine = await kurentoClient.createMediaPipeline()
      let recorderEndpoint = await RecorderEndpoint.build(mediaPipeLine, config.recorderUri)
      assert.ok(recorderEndpoint, 'Recorder Endpoint')
      expect((recorderEndpoint.inner.id).length).to.equal(120)
      let webRtcEndpoint = await WebRtcEndpoint.build(mediaPipeLine)
      await webRtcEndpoint.connect(recorderEndpoint)
      await recorderEndpoint.record()
      webRtcEndpoint.dispose()
      recorderEndpoint.dispose()
      resolve()
    })
  })
})
