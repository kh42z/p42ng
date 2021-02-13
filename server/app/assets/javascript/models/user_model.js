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

  },

  urlRoot: '/api/users/',

  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  },

  getUser: function (url, oauthService) {
    this.fetch({
      url: this.urlRoot + url,
      success: function (response) {
        console.log(response)
      },
      error: function (errorResponse) {
        console.log('error')
        console.log(errorResponse)
      }
    })
  }
})
