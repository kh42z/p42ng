import { FetchAPI } from '../services/fetchAPI'
import { SuperHeaders } from '../services/headers'

export const User = Backbone.Model.extend({
  // idAttribute is by default id anyway
  idAttribute: 'id',
  defaults: {
    email: undefined,
    first_login: undefined,
    guild_id: undefined,
    image_url: undefined,
    ladder_games_lost: undefined,
    ladder_games_won: undefined,
    ladder_id: undefined,
    nickname: undefined,
    status: undefined,
    two_factor: undefined,
    uid: undefined,
    created_at: undefined,
    updated_at: undefined
  },

  initialize: function (url) {
  },

  urlRoot: '/api/users/',

  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    if (this.avatar !== undefined) {
      return this.urlRoot + this.id + '/avatar'
    }
    return this.urlRoot
  },

  fetchUser: function (url) {
    return this.fetch({
      url: this.urlRoot + url,
      success: function (response) {
      },
      error: function (errorResponse) {
      }
    })
  },

  saveNickname: function (nickname) {
    this.set({ nickname: nickname })
    return this.save({ nickname: this.get('nickname') }, {
      patch: true,
      success: function (response) {
      },
      error: function (data, statusText) {
      }
    })
  },

  saveImage: async function (data) {
    const fetchAPI = new FetchAPI()
    const url = this.urlRoot + this.id + '/avatar'
    return fetchAPI.saveImage(url, data)
  },

  saveFirstLogin: function (firstLogin) {
    this.set({ first_login: firstLogin })
    this.save({ first_login: firstLogin }, { patch: true })
  },

  saveTwoFactor: function (twoFactor) {
    this.set({ two_factor: twoFactor })
    this.save({ two_factor: twoFactor }, { patch: true })
  }
})
