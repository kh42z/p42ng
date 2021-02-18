import { SuperHeaders } from './headers'

export class FetchAPI {
  async saveImage (url, data) {
    const superHeaders = new SuperHeaders()
    const headers = superHeaders.getHeaders()
    headers.append('accept', 'application/json')

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    })
    const data1 = await response.json()
    return data1
  }
}
