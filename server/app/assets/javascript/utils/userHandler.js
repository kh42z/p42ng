import { User } from '../models/user_model.js'
import { Guild } from '../models/guild_model.js'

export const UserHandler = Backbone.Model.extend({
  defaults: {},
  initialize: function (userId) {
    this.userModel = new User('/api/users/' + userId)
    this.guildModel = undefined
    this.listenTo(this.userModel, 'sync', function () {
      this.doGuild()
    }, this)
  },

  doGuild: function () {
    if (this.userModel.get('guild_id')) {
      this.guildModel = new Guild(this.userModel.get('guild_id'))
      console.log('bonjour')
    }
    this.listenTo(this.guildModel, 'sync', function () {
      console.log(this.guildModel.get('name') + ' here2')
    }, this)
    console.log(this.userModel.get('nickname') + ' here')
    //  console.log(this.guildModel.get("name"))
  },

  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  }
})
