export class OauthService {
  constructor () {
    this.urlParams = new URLSearchParams(window.location.search)
    history.replaceState({}, null, '/')
    $.ajaxSetup({
      headers: {
        'access-token': this.urlParams.get('auth_token'),
        uid: this.urlParams.get('uid'),
        client: this.urlParams.get('client_id')
      }
    })
  }

  getAuthToken () {
    return this.urlParams.get('auth_token')
  }

  getUid () {
    return this.urlParams.get('uid')
  }

  getClientId () {
    return this.urlParams.get('client_id')
  }

  getUserId () {
    return this.urlParams.get('user_id')
  }
}
