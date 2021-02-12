export const User = Backbone.Model.extend({
  defaults: {
    id: undefined,
    two_factor: undefined,
    email: undefined,
    provider: undefined,
    nickname: undefined,
    image_url: undefined,
    status: undefined,
    mmr: undefined,
    uid: undefined,
    allow_password_change: undefined,
    name: undefined,
    image: undefined,
    displayname: undefined,
    location: undefined,
    phone: undefined,
    ladder_id: undefined,
    guild_id: undefined,
    created_at: undefined,
    updated_at: undefined
  },

  initialize: function (url, oauthService) {
    this.fetch({
      url: url,
      headers: {
        'access-token': oauthService.getAuthToken(),
        uid: oauthService.getUid(),
        client: oauthService.getClientId()
      },
      success: function (response) {
        console.log(response)
      },
      error: function (errorResponse) {
        console.log('error')
        console.log(errorResponse)
      }
    })
  },

  urlRoot: '/api/users/',

  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  }
})

// const user = new User({ id: 1 })

// async function showAvatar () {
//   await user.fetch({
//     url: user.urlRoot + '1',
//     headers: {
//       // Authentification
//       client: '3wy2VwUgD-pEv7gWJJh9dw',
//       'access-token': 'xT4ql1Yq2ALJDSG9cgh1kA',
//       uid: '56065'
//     },
//     success: function (response) {

//     },
//     error: function (errorResponse) {
//       console.log('error')
//       console.log(errorResponse)
//     }
//   })
//   console.log(user.get('email'))
//   console.log(user.get('image_url'))
//   console.log(user.get('avatar'))
//   console.log(user.get('image'))
//   console.log(user.get('ladder_id'))
// }

// showAvatar()

// const users = new Users()
// // users.create(user)

// // console.log('parse: ' + User.parse())
