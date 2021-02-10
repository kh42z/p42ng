import { Guild } from '../models/guild_model'

const Guilds = Backbone.Collection.extend({
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
