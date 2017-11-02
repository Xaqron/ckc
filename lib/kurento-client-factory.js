const kurento = require('kurento-client')
const MediaPipeline = require('./media-pipeline')

class KurentoClientFactory {
  constructor (inner, serviceUri, timeOut) {
    if (typeof inner === 'undefined') {
      throw new Error('Constructor cannot be called directly. Use build method instead.')
    }
    this._inner = inner
    this._timeOut = timeOut
    this._serviceUri = serviceUri
  }

  get timeOut () {
    return this._timeOut
  }

  get serviceUri () {
    return this._serviceUri
  }

  get inner () {
    return this._inner
  }

  static async build (serviceUri, timeOut = 60000) {
    let result = await this._createInner(serviceUri, timeOut)
    return new KurentoClientFactory(result.inner, serviceUri, timeOut)
  }

  async createMediaPipeline () {
    let result = await MediaPipeline.build(this._inner)
    return result
  }

  static _createInner (kmsUrl, timeOut) {
    return new Promise((resolve, reject) => {
      kurento(kmsUrl, (error, inner) => {
        if (error) {
          return reject(error)
        } else {
          return resolve({ inner })
        }
      })
      setTimeout(() => {
        return reject(new Error(`Timeout occurred: ${timeOut} ms`))
      }, timeOut)
    })
  }
}

module.exports = KurentoClientFactory
