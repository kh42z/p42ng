import { SuperHeaders } from './headers'

export class FetchAPI {
  constructor () {
    this.superHeaders = new SuperHeaders()
  }

  async saveImage (url, data) {
    const headers = this.superHeaders.getHeaders()
    headers.append('accept', 'application/json')

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    })
    const data1 = await response.json()
    return data1
  }

  exit () {
    const headers = this.superHeaders.getHeaders()

    fetch('/auth/sign_out', {
      method: 'DELETE',
      headers: headers
    })
  }
}
