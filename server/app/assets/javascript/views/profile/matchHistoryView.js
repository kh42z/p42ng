import { GameRecords } from '../../collections/gameRecords.js'

export const MatchHistoryView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.users = this.model.get('users').get('obj')
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.getGameRecords() }, this)
  },

  getGameRecords: function () {
    this.gameRecords = new GameRecords()
    this.listenTo(this.gameRecords, 'sync', function () { this.render() }, this)
    // this.render()
  },

  render: function () {
    const template = Handlebars.templates.matchHistory
    const context = {}

    context.player = this.users.get(this.id).get('nickname')
    if (this.users.get(this.id).get('guild_id') != null) {
      context.guild = this.guilds.get(this.users.get(this.id).get('guild_id')).get('anagram')
    } else { context.guild = this.users.get(this.id).get('guild_id') }

    context.guildId =	this.users.get(this.id).get('guild_id')
    context.id = this.id

    context.matchs = Array()

    for (let i = 1; i <= this.gameRecords.length; i++) {
      if (this.gameRecords.get(i).get('winner_id') == this.id ||
			this.gameRecords.get(i).get('looser_id') == this.id) {
        let opponentId
        let opponentGuild
        let result

        if (this.gameRecords.get(i).get('winner_id') == this.id) {
          opponentId = this.gameRecords.get(i).get('looser_id')
          result = 'WIN'
        } else {
          opponentId = this.gameRecords.get(i).get('winner_id')
          result = 'LOOSE'
        }
        const opponentName = this.users.get(opponentId).get('nickname')
        if (this.users.get(opponentId).get('guild_id') != null) { opponentGuild = this.guilds.get(this.users.get(opponentId).get('guild_id')).get('anagram') } else { opponentGuild = '' }

        context.matchs.push({
          result: result,
          opponentName: opponentName,
          opponentGuild: opponentGuild,
          opponentId: opponentId,
          opponentGuildId: this.users.get(opponentId).get('guild_id'),
          date: this.gameRecords.get(i).get('created_at')
        })
      }
    }
    this.$el.html(template(context))
    return this
  }
})
