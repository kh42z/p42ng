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

    context.guild_id = this.users.get(this.id).get('guild_id')
    context.id = this.id

    context.matchs = Array()

    for (let i = 1; i <= this.gameRecords.length; i++) {
      const game = {}
      if (context.id == this.gameRecords.get(i).get('player_left_id') ||
			context.id == this.gameRecords.get(i).get('player_right_id')) {
        game.player_left_id = this.gameRecords.get(i).get('player_left_id')
        game.player_right_id = this.gameRecords.get(i).get('player_right_id')
        game.player_left_nickname = this.users.get(game.player_left_id).get('nickname')
        game.player_right_nickname = this.users.get(game.player_right_id).get('nickname')
        game.game_type = this.gameRecords.get(i).get('game_type')
        game.created_at = this.gameRecords.get(i).get('created_at')
        if (context.id == this.gameRecords.get(i).get('winner_id')) { game.result = 'win' } else { game.result = 'loose' }
        context.matchs.push(game)
      }
    }

    // console.log(this.gameRecords)

    console.log(template(context))
    this.$el.html(template(context))
    return this
  }
})
