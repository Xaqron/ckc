/*  global describe it */

const expect = require('chai').expect
const assert = require('chai').assert

const CKC = require('../')
const config = require('./config')
const WebRtcEndpoint = CKC.WebRtcEndpoint
const KurentoClientFactory = CKC.KurentoClientFactory

describe('CKC', function () {
  this.timeout(60000)
  it('WebRtc Endpoint', () => {
    return new Promise(async (resolve, reject) => {
      const kurentoClient = await KurentoClientFactory.build(config.kmsUrl)
      let mediaPipeLine = await kurentoClient.createMediaPipeline()
      let webRtcEndpoint = await WebRtcEndpoint.build(mediaPipeLine)
      assert.ok(webRtcEndpoint, 'WebRtc Endpoint')
      expect((webRtcEndpoint.inner.id).length).to.equal(118)
      const iceCandidates = [{
        candidate: 'candidate:0 1 UDP 2122252543 192.168.1.52 41773 typ host',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:3 1 UDP 2122187007 10.8.0.2 47642 typ host',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:6 1 TCP 2105508095 192.168.1.52 51643 typ host tcptype passive',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:6 1 TCP 2105524479 192.168.1.52 9 typ host tcptype active',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:7 1 TCP 2105442559 10.8.0.2 62820 typ host tcptype passive',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:7 1 TCP 2105458943 10.8.0.2 9 typ host tcptype active',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:0 2 UDP 2122252542 192.168.1.52 58635 typ host',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:3 2 UDP 2122187006 10.8.0.2 38088 typ host',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:6 2 TCP 2105508094 192.168.1.52 51481 typ host tcptype passive',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:6 2 TCP 2105524478 192.168.1.52 9 typ host tcptype active',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:7 2 TCP 2105442558 10.8.0.2 61100 typ host tcptype passive',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:7 2 TCP 2105458942 10.8.0.2 9 typ host tcptype active',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:0 1 UDP 2122252543 192.168.1.52 47523 typ host',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:3 1 UDP 2122187007 10.8.0.2 37537 typ host',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:6 1 TCP 2105508095 192.168.1.52 58126 typ host tcptype passive',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:6 1 TCP 2105524479 192.168.1.52 9 typ host tcptype active',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:7 1 TCP 2105442559 10.8.0.2 53288 typ host tcptype passive',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:7 1 TCP 2105458943 10.8.0.2 9 typ host tcptype active',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:0 2 UDP 2122252542 192.168.1.52 36119 typ host',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:3 2 UDP 2122187006 10.8.0.2 50473 typ host',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:6 2 TCP 2105508094 192.168.1.52 55885 typ host tcptype passive',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:6 2 TCP 2105524478 192.168.1.52 9 typ host tcptype active',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:7 2 TCP 2105442558 10.8.0.2 58967 typ host tcptype passive',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:7 2 TCP 2105458942 10.8.0.2 9 typ host tcptype active',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:4 2 UDP 1685987326 64.71.72.89 38088 typ srflx raddr 10.8.0.2 rport 38088',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:4 1 UDP 1685987327 64.71.72.89 37537 typ srflx raddr 10.8.0.2 rport 37537',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }, {
        candidate: 'candidate:4 1 UDP 1685987327 64.71.72.89 47642 typ srflx raddr 10.8.0.2 rport 47642',
        sdpMid: 'sdparta_0',
        sdpMLineIndex: 0
      }, {
        candidate: 'candidate:4 2 UDP 1685987326 64.71.72.89 50473 typ srflx raddr 10.8.0.2 rport 50473',
        sdpMid: 'sdparta_1',
        sdpMLineIndex: 1
      }]
      for (let iceCandidate of iceCandidates) {
        webRtcEndpoint.addIceCandidate(iceCandidate)
      }
      const sdpOffer = `
      v=0
      o=mozilla...THIS_IS_SDPARTA-56.0 7079457366762502368 0 IN IP4 0.0.0.0
      s=-
      t=0 0
      a=sendrecv
      a=fingerprint:sha-256 F8:CB:BE:4F:F4:C2:B9:96:B8:EA:52:81:89:6B:30:FE:23:BC:8C:49:1A:F9:C3:85:77:C5:C0:52:59:51:32:BD
      a=group:BUNDLE sdparta_0 sdparta_1
      a=ice-options:trickle
      a=msid-semantic:WMS *
      m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
      c=IN IP4 0.0.0.0
      a=sendrecv
      a=extmap:1/sendonly urn:ietf:params:rtp-hdrext:ssrc-audio-level
      a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1
      a=fmtp:101 0-15
      a=ice-pwd:775f8c32ce7cdb69c7f8e87a638c864e
      a=ice-ufrag:64a256c1
      a=mid:sdparta_0
      a=msid:{c008e915-feb6-43db-9b40-9f6e4affdfcd} {fc04f40b-9631-4401-b13d-19cba7e6928b}
      a=rtcp-mux
      a=rtpmap:109 opus/48000/2
      a=rtpmap:9 G722/8000/1
      a=rtpmap:0 PCMU/8000
      a=rtpmap:8 PCMA/8000
      a=rtpmap:101 telephone-event/8000
      a=setup:actpass
      a=ssrc:2261144461 cname:{9082c289-e488-4d8f-bc05-1d9d1071980f}
      m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
      c=IN IP4 0.0.0.0
      a=sendrecv
      a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
      a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
      a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1
      a=fmtp:120 max-fs=12288;max-fr=60
      a=fmtp:121 max-fs=12288;max-fr=60
      a=ice-pwd:775f8c32ce7cdb69c7f8e87a638c864e
      a=ice-ufrag:64a256c1
      a=mid:sdparta_1
      a=msid:{c008e915-feb6-43db-9b40-9f6e4affdfcd} {14cd600f-67f3-469d-9590-9cf217fb22e0}
      a=rtcp-fb:120 nack
      a=rtcp-fb:120 nack pli
      a=rtcp-fb:120 ccm fir
      a=rtcp-fb:120 goog-remb
      a=rtcp-fb:121 nack
      a=rtcp-fb:121 nack pli
      a=rtcp-fb:121 ccm fir
      a=rtcp-fb:121 goog-remb
      a=rtcp-fb:126 nack
      a=rtcp-fb:126 nack pli
      a=rtcp-fb:126 ccm fir
      a=rtcp-fb:126 goog-remb
      a=rtcp-fb:97 nack
      a=rtcp-fb:97 nack pli
      a=rtcp-fb:97 ccm fir
      a=rtcp-fb:97 goog-remb
      a=rtcp-mux
      a=rtpmap:120 VP8/90000
      a=rtpmap:121 VP9/90000
      a=rtpmap:126 H264/90000
      a=rtpmap:97 H264/90000
      a=setup:actpass
      a=ssrc:1369940689 cname:{9082c289-e488-4d8f-bc05-1d9d1071980f}
      `
      webRtcEndpoint.onIceCandidate(async function (iceCandidate) {
        console.log(`Received ice candidate: ${iceCandidate}`)
      })
      let sdpAnswer = await webRtcEndpoint.processOffer(sdpOffer)
      await webRtcEndpoint.gatherCandidates()
      expect(sdpAnswer.length).to.greaterThan(1000)
      expect(sdpAnswer.split(/\r\n|\r|\n/).length).to.greaterThan(40)
      // connect
      let webRtcEndpoint2 = await WebRtcEndpoint.build(mediaPipeLine)
      assert.ok(webRtcEndpoint2, 'WebRtc Endpoint')
      expect((webRtcEndpoint2.inner.id).length).to.equal(118)
      await webRtcEndpoint.connect(webRtcEndpoint2)
      webRtcEndpoint.dispose()
      resolve()
    })
  })
})
