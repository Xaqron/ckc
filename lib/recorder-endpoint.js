const ENDPOINT_TYPE = 'RecorderEndpoint'
const EndpointBase = require('./abstract/endpoint-base')

class RecorderEndpoint extends EndpointBase {
  constructor (mediaPipeline, inner, timeOut, uri) {
    super(mediaPipeline, ENDPOINT_TYPE, inner, timeOut)
    this._uri = uri
    this._recording = false
  }

  get uri () {
    return this._uri
  }

  static async build (mediaPipeline, uri, timeOut = 60000) {
    let options = {uri: uri}
    let result = await super._createInner(mediaPipeline, ENDPOINT_TYPE, timeOut, options)
    return new RecorderEndpoint(mediaPipeline, result.inner, timeOut, uri)
  }

  async record () {
    if (this._recording) {
      throw new Error('Already recording!')
    } else {
      this.inner.record()
      this._recording = true
    }
  }
}

module.exports = RecorderEndpoint
