export class OauthService {
  constructor () {
    this.urlParams = new URLSearchParams(window.location.search)
    history.replaceState({}, null, '/')
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
}
