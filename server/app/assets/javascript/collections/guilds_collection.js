import { Guild } from '../models/guild_model'

export const Guilds = Backbone.Collection.extend({
  initialize: function () {
    this.on('all', function (e) {
      //
    })
  },
  model: Guild,
  urlRoot: 'api/guilds/',
  url: function () {
    return this.urlRoot
  }
})
