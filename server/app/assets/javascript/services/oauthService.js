export class OauthService {
  constructor () {
    this.urlParams = new URLSearchParams(window.location.search)
    history.replaceState({}, null, '/#home')
    window.localStorage.setItem('access-token', this.urlParams.get('auth_token'))
    window.localStorage.setItem('user_id', this.urlParams.get('user_id'))
    $.ajaxSetup({
      headers: {
        'access-token': this.urlParams.get('auth_token'),
        uid: this.urlParams.get('uid'),
        client: this.urlParams.get('client_id')
      }
    })
  }
}
