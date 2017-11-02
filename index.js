const MediaPipeline = require('./lib/media-pipeline')
const KurentoClientFactory = require('./lib/kurento-client-factory')
const WebRtcEndpoint = require('./lib/webrtc-endpoint')
const PlayerEndpoint = require('./lib/player-endpoint')
const RecorderEndpoint = require('./lib/recorder-endpoint')

module.exports = {
  KurentoClientFactory,
  MediaPipeline,
  WebRtcEndpoint,
  PlayerEndpoint,
  RecorderEndpoint
}
