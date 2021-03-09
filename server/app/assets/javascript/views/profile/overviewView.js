import { Guild } from '../../models/guild_model.js'
import { Ladder } from '../../models/ladderModel.js'

// useless view for test only

export const ProfileOverviewView = Backbone.View.extend({
  initialize: function () {
    this.templateProfileOverview = Handlebars.templates.profileOverview
    // this.userHandler = new UserHandler()
    this.users = this.model.get('users').get('obj')
    // this.guilds = this.model.get("guilds").get("obj")

    console.log(this.user)
    this.listenTo(this.users, 'sync', function () {
      this.getGuild()
    }, this)
  },
  el: $('#app'),

  getGuild: function () {
    // this.guild = new Guild(this.model.get('guild_id'))
    console.log('yo')
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () {
      this.getLadder()
    }, this)
  },

  getLadder: function () {
    // this.ladder = new Ladder(0)
    // this.listenTo(this.ladder, 'sync', function () {
    console.log('yes')
    this.render()
    // }, this)
  },

  render: function () {
    const context = {
      nickname: this.users.at(this.id).get('nickname'),
      user_mmr: this.users.at(this.id).get('mmr'),
      user_guild: this.guilds.at(this.id).get('anagram'),
      user_guild_id: this.users.at(this.id).get('guild_id')
      // user_ladder: this.ladder.get("name")
    }

    // const templateProfileOverview = Handlebars.templates.profileOverview
    const templateData = this.templateProfileOverview(context)
    // console.log(this.model.get('nickname'))
    console.log('overview')
    console.log(templateData)
    this.$el.html(templateData)
    return this
  }
})
