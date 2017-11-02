const ENDPOINT_TYPE = 'PlayerEndpoint'
const EndpointBase = require('./abstract/endpoint-base')

class PlayerEndpoint extends EndpointBase {
  constructor (mediaPipeline, inner, timeOut, uri) {
    super(mediaPipeline, ENDPOINT_TYPE, inner, timeOut)
    this._uri = uri
    this._playing = false
    this._connected = false
    this._targetEndPoint = null
  }

  get uri () {
    return this._uri
  }

  static async build (mediaPipeline, uri, timeOut = 60000) {
    let options = {uri: uri}
    let result = await super._createInner(mediaPipeline, ENDPOINT_TYPE, timeOut, options)
    return new PlayerEndpoint(mediaPipeline, result.inner, timeOut, uri)
  }

  async connect (targetEndPoint) {
    if (this._playing) {
      throw new Error(`Player is already playing: ${this.uri}`)
    } else {
      await this._connect(targetEndPoint)
      this._connected = true
    }
  }

  _connect (targetEndPoint) {
    let self = this
    return new Promise((resolve, reject) => {
      self.inner.connect(targetEndPoint.inner, (error) => {
        if (error) {
          return reject(error)
        } else {
          return resolve(true)
        }
      })
      setTimeout(() => {
        return reject(new Error(`Player, connect timeout occurred: ${self.timeOut} ms`))
      }, self.timeOut)
    })
  }

  async play () {
    if (!this._connected) {
      throw new Error('Cannot play before connecting to an end-point.')
    } else if (this._playing) {
      throw new Error('Player is already playing!')
    } else {
      await this._play()
      this._playing = true
    }
  }

  _play (finishedCallBack) {
    let self = this
    return new Promise((resolve, reject) => {
      self.inner.play((error) => {
        if (error) {
          return reject(error)
        } else {
          self.inner.on('EndOfStream', (event) => {
            self._playing = false
            finishedCallBack()
          })
          return resolve(true)
        }
      })
      setTimeout(() => {
        return reject(new Error(`Player, play timeout occurred: ${self.timeOut} ms`))
      }, self.timeOut)
    })
  }
}

module.exports = PlayerEndpoint
