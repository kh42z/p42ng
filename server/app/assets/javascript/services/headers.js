export class SuperHeaders {
  constructor () {
    this.headers = new Headers()
    this.headers.append('access-token', window.localStorage.getItem('access-token'))
    this.headers.append('uid', window.localStorage.getItem('uid'))
    this.headers.append('client', window.localStorage.getItem('client_id'))
  }

  getHeaders () {
    return this.headers
  }
}
