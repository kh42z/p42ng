export class TwoFactorService {

    auth(user_id, code) {
        this.uid = window.localStorage.getItem('user_id')
        return fetch('/two_factor/' + this.uid + '?' + new URLSearchParams({
            code: code,
        }), {
            method: 'GET',
        }).then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            window.localStorage.setItem('access-token', data['access-token'])
            window.localStorage.setItem('client_id', data['client_id'])
            window.localStorage.setItem('uid', data['uid'])
        })
    }
}