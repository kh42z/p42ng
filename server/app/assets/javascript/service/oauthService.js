export class OauthService {
  constructor () {
    this.urlParams = new URLSearchParams(window.location.search)
    history.replaceState({}, null, '/#home')
    window.localStorage.setItem('access-token', this.urlParams.get('auth_token'))
    window.localStorage.setItem('uid', this.urlParams.get('uid'))
    window.localStorage.setItem('client', this.urlParams.get('client_id'))
    window.localStorage.setItem('user_id', this.urlParams.get('user_id'))
    $.ajaxSetup({
      headers: {
        'access-token': window.localStorage.getItem('access-token'),
        uid: window.localStorage.getItem('uid'),
        client: window.localStorage.getItem('client_id')
      }
    })
  }
}
