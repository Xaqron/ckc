class EndpointBase {
  constructor (mediaPipeline, endpointType, inner, timeOut) {
    if ((typeof mediaPipeline === 'undefined') || (typeof endpointType === 'undefined') ||
     (typeof inner === 'undefined')) {
      throw new Error('Constructor cannot be called directly. Use build method instead.')
    }
    this._disposed = false
    this._timeOut = timeOut
    this._inner = inner
    this._pipeLine = mediaPipeline
    this._iceCandidates = []
    this._endpointType = endpointType
  }

  get inner () {
    if (this._disposed) {
      throw new Error('Endpoint is disposed.')
    } else {
      return this._inner
    }
  }

  get timeOut () {
    return this._timeOut
  }

  get endpointType () {
    return this._endpointType
  }

  static async build (mediaPipeline, endpointType, timeOut = 60000) {
    throw new Error('Abstract method should not be called directly.')
  }

  dispose () {
    this._disposed = true
    this._pipeLine.dispose()
  }

  static _createInner (mediaPipeline, endpointType, timeOut, options = null) {
    return new Promise((resolve, reject) => {
      mediaPipeline.inner.create(endpointType, options, (error, inner) => {
        if (error) {
          return reject(error)
        } else {
          return resolve({ inner })
        }
      })
      setTimeout(() => {
        return reject(new Error(`${endpointType} timeout occurred: ${timeOut} ms`))
      }, timeOut)
    })
  }
}

module.exports = EndpointBase
