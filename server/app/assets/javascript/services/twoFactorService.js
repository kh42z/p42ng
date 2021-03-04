export class TwoFactorService {
    auth(user_id, code) {
        fetch('/two_factor/' + user_id + '?' + new URLSearchParams({
            code: code,
        }), {
            method: 'GET',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            history.replaceState({}, null, '/#home')
            window.localStorage.setItem('access-token', data['access-token'])
            window.localStorage.setItem('user_id', data['user_id'])
            window.localStorage.setItem('client_id', data['client_id'])
            window.localStorage.setItem('uid', data['uid'])
            return this
        })
    }
}