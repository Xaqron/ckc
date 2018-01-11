const ENDPOINT_TYPE = 'WebRtcEndpoint'
const EndpointBase = require('./abstract/endpoint-base')

class WebRtcEndpoint extends EndpointBase {
  constructor (pipeline, inner, timeOut) {
    super(pipeline, ENDPOINT_TYPE, inner, timeOut)
    this._onIceCandidateCallBack = null

    this.inner.on('OnIceCandidate', (event) => {
      let candidate = this._pipeLine.getIceCandidateComplexType(event.candidate)
      if (this._onIceCandidateCallBack) {
        this._onIceCandidateCallBack(candidate)
      } else {
        this._iceCandidates.push(candidate)
      }
    })
  }

  static async build (pipeline, timeOut = 60000) {
    let result = await super._createInner(pipeline, ENDPOINT_TYPE, timeOut)
    return new WebRtcEndpoint(pipeline, result.inner, timeOut)
  }

  addIceCandidate (candidate) {
    if (this._disposed) {
      throw new Error('Endpoint is disposed.')
    } else {
      candidate = this._pipeLine.getIceCandidateComplexType(candidate)
      this.inner.addIceCandidate(candidate)
    }
  }

  onIceCandidate (callback) {
    this._onIceCandidateCallBack = callback
    while (this._iceCandidates.length > 0) {
      callback(this._iceCandidates.shift())
    }
  }

  processOffer (sdpOffer, callback) {
    return new Promise((resolve, reject) => {
      this.inner.processOffer(sdpOffer, (error, sdpAnswer) => {
        if (error) {
          reject(error)
        } else {
          resolve(sdpAnswer)
        }
      })
    })
  }

  gatherCandidates () {
    return new Promise((resolve, reject) => {
      this.inner.gatherCandidates((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  connect (targetWebRtcEndpoint) {
    return new Promise((resolve, reject) => {
      this.inner.connect(targetWebRtcEndpoint.inner, (error) => {
        if (error) {
          // Release pipeline?
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = WebRtcEndpoint
