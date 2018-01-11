/*  global describe it */

const expect = require('chai').expect
const assert = require('chai').assert

const CKC = require('../')
const config = require('./config')
const PlayerEndpoint = CKC.PlayerEndpoint
const WebRtcEndpoint = CKC.WebRtcEndpoint
const KurentoClientFactory = CKC.KurentoClientFactory

describe('CKC', function () {
  this.timeout(60000)
  it('WebRtc Endpoint', () => {
    return new Promise(async (resolve, reject) => {
      const kurentoClient = await KurentoClientFactory.build(config.kmsUrl)
      let mediaPipeLine = await kurentoClient.createMediaPipeline()
      let playerEndpoint = await PlayerEndpoint.build(mediaPipeLine, config.playerUri)
      assert.ok(playerEndpoint, 'Player Endpoint')
      expect((playerEndpoint.inner.id).length).to.equal(118)
      let webRtcEndpoint = await WebRtcEndpoint.build(mediaPipeLine)
      await playerEndpoint.connect(webRtcEndpoint)
      await playerEndpoint.play()
      await playerEndpoint.stop()
      webRtcEndpoint.dispose()
      playerEndpoint.dispose()
      resolve()
    })
  })
})
