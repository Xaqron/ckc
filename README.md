# CKC #

Civilized Kurento Client provides wrapper classes for kurento-client functionality.

## Usage ##

```bash
npm install --save ckc
```

```js
const CKC = require('ckc')
const WebRtcEndpoint = CKC.WebRtcEndpoint
const KurentoClientFactory = CKC.KurentoClientFactory

async function test (kurentoServerUrl) {
  const kurentoClient = await KurentoClientFactory.build(kurentoServerUrl)
  let mediaPipeLine = await kurentoClient.createMediaPipeline()
  let webRtcEndpoint = await WebRtcEndpoint.build(mediaPipeLine)
  // Add client ice candidates in a loop
  webRtcEndpoint.addIceCandidate(iceCandidate)
  // here you can get generated ice candidates
  webRtcEndpoint.onIceCandidate(async function (iceCandidate) {
    console.log(`Received ice candidate: ${iceCandidate}`)
    // send generated ice candidates to client
  })
  // Using client sdp offer generate answer and send to client
  let sdpAnswer = await webRtcEndpoint.processOffer(sdpOffer)
  await webRtcEndpoint.gatherCandidates()
}

test('ws://localhost:8888/kurento')
```