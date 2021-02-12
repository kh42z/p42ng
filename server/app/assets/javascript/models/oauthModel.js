export const OauthModel = Backbone.Model.extend({
  defaults: {
    clientid: undefined,
    uid: undefined,
    'access-token': undefined
  },
  initialize: function () {
  },

  url: function () {
    return 'http://localhost:3000/auth/marvin?auth_origin_url=http://localhost:3000/api/ladders'
  },
  getOauth: function () {
  //   this.fetch({
  //     success: function (response) {
  //       console.log(response)
  //     },
  //     error: function (response) {
  //       console.log('error')
  //       console.log(response)
  //     }
  //   })
  }
})
