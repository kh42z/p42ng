export const User = Backbone.Model.extend({
  defaults: {
    allow_password_change: undefined,
    chat_ids: [],
    created_at: undefined,
    displayname: undefined,
    email: undefined,
    first_login: undefined,
    guild_id: undefined,
    id: undefined,
    image: undefined,
    image_url: undefined,
    ladder_games_lost: undefined,
    ladder_games_won: undefined,
    ladder_id: undefined,
    location: undefined,
    mmr: undefined,
    name: undefined,
    nickname: undefined,
    phone: undefined,
    provider: undefined,
    state_id: undefined,
    status: undefined,
    two_factor: undefined,
    uid: undefined,
    updated_at: undefined
  },

  initialize: function (url) {
  },

  urlRoot: '/api/users/',

  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  },

  fetchUser: function (url) {
    return this.fetch({
      url: this.urlRoot + url,
      success: function (response) {
        console.log(response)
      },
      error: function (errorResponse) {
        console.log('error')
        console.log(errorResponse)
      }
    })
  },

  saveNickname: function (nickname) {
    console.log('save nickname')
    this.set({ nickname: nickname })
    console.log(this.get('nickname'))
    console.log(this.nickname)
    this.save({ nickname: this.get('nickname') }, { patch: true }, {
      success: function (response) {
        console.log('success')
        console.log(response)
      },
      error: function (response) {
        console.log('error')
        console.log(response)
      }
    })
  }

  getFirstLogin(): function () {
    
  }
})
