const kurento = require('kurento-client')

class MediaPipeline {
  constructor (kurentoClient, inner, timeOut) {
    if ((typeof kurentoClient === 'undefined') || (typeof inner === 'undefined')) {
      throw new Error('Constructor cannot be called directly. Use build method instead.')
    }
    this._disposed = false
    this._timeOut = timeOut
    this._inner = inner
    this._kurentoClient = kurentoClient
  }

  get inner () {
    if (this._disposed) {
      throw new Error('MediaPipeline is disposed.')
    } else {
      return this._inner
    }
  }

  static async build (kurentoClient, timeOut = 60000) {
    let result = await this._createInner(kurentoClient, timeOut)
    return new MediaPipeline(kurentoClient, result.inner, timeOut)
  }

  getIceCandidateComplexType (candidate) {
    return kurento.getComplexType('IceCandidate')(candidate)
  }

  dispose () {
    this._disposed = true
    this._inner.release()
  }

  static _createInner (kurentoClient, timeOut) {
    return new Promise((resolve, reject) => {
      kurentoClient.create('MediaPipeline', (error, inner) => {
        if (error) {
          reject(error)
        } else {
          resolve({ inner })
        }
      })
      setTimeout(() => {
        reject(new Error(`Timeout occurred: ${timeOut} ms`))
      }, timeOut)
    })
  }
}

module.exports = MediaPipeline
