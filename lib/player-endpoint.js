const ENDPOINT_TYPE = 'PlayerEndpoint'
const EndpointBase = require('./abstract/endpoint-base')

class PlayerEndpoint extends EndpointBase {
  constructor (mediaPipeline, inner, timeOut, uri) {
    super(mediaPipeline, ENDPOINT_TYPE, inner, timeOut)
    this._uri = uri
    this._isPlaying = false
    this._connected = false
    this._targetEndPoint = null
  }

  get uri () {
    return this._uri
  }

  get isPlaying () {
    return this._isPlaying
  }

  static async build (mediaPipeline, uri, timeOut = 60000) {
    let options = {uri: uri}
    let result = await super._createInner(mediaPipeline, ENDPOINT_TYPE, timeOut, options)
    return new PlayerEndpoint(mediaPipeline, result.inner, timeOut, uri)
  }

  async connect (targetEndPoint) {
    if (this._isPlaying) {
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
          reject(error)
        } else {
          resolve(true)
        }
      })
      setTimeout(() => {
        reject(new Error(`Player, connect timeout occurred: ${self.timeOut} ms`))
      }, self.timeOut)
    })
  }

  async play (finishedCallBack) {
    if (!this._connected) {
      throw new Error('Cannot play before connecting to an end-point.')
    } else if (this._isPlaying) {
      throw new Error('Player is already playing!')
    } else {
      await this._play(finishedCallBack)
      this._isPlaying = true
    }
  }

  _play (finishedCallBack) {
    let self = this
    return new Promise((resolve, reject) => {
      self.inner.play((error) => {
        if (error) {
          reject(error)
        } else {
          self.inner.on('EndOfStream', (event) => {
            self._isPlaying = false
            finishedCallBack()
          })
          resolve(true)
        }
      })
      setTimeout(() => {
        reject(new Error(`Player, play timeout occurred: ${self.timeOut} ms`))
      }, self.timeOut)
    })
  }

  async stop () {
    if (!this._isPlaying) {
      throw new Error('Stop should be called while player is playing.')
    } else {
      await this._stop()
      this._isPlaying = false
    }
  }

  _stop () {
    let self = this
    return new Promise((resolve, reject) => {
      self.inner.stop((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
      setTimeout(() => {
        reject(new Error(`Player, stop timeout occurred: ${self.timeOut} ms`))
      }, self.timeOut)
    })
  }

  async pause () {
    throw new Error('Not Implemented!')
  }
}

module.exports = PlayerEndpoint
