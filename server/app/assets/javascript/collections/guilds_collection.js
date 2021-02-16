import { Guild } from '../models/guild_model'

export const Guilds = Backbone.Collection.extend({
  initialize: function (url) {
    this.on('all', function (e) {
      //
    })
		this.fetch("success");
		console.log("ici")
  },
  model: Guild,
  urlRoot: '/api/guilds/',
  url: function () {
    return this.urlRoot
  }
})
