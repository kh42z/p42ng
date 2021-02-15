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
        'access-token': this.urlParams.get('auth_token'),
        uid: this.urlParams.get('uid'),
        client: this.urlParams.get('client_id')
      }
    })
  }

  isFirstConnexion () {
    return this.urlParams.get('connexion')
  }
}
