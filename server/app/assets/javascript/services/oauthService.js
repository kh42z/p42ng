export class OauthService {
  setAjaxEnvironnement () {
    this.urlParams = new URLSearchParams(window.location.search)
    history.replaceState({}, null, '/#home')
    window.localStorage.setItem('access-token', this.urlParams.get('auth_token'))
    window.localStorage.setItem('user_id', this.urlParams.get('user_id'))
    window.localStorage.setItem('client_id', this.urlParams.get('client_id'))
    window.localStorage.setItem('uid', this.urlParams.get('uid'))
    return this
  }

  ajaxSetup () {
    return $.ajaxSetup({
      headers: {
        'access-token': window.localStorage.getItem('access-token'),
        uid: window.localStorage.getItem('uid'),
        client: window.localStorage.getItem('client_id')
      }
    })
  }
}
