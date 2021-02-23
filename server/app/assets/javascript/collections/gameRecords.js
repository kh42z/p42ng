import { GameRecord } from '../models/gameRecord.js'

export const GameRecords = Backbone.Collection.extend({
  initialize: function (url) {
    this.on('all', function (e) {
      //
    })
    this.fetch('success')
  },
  model: GameRecord,
  urlRoot: '/api/game_records',
  url: function () {
    return this.urlRoot
  }
})
