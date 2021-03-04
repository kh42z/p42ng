export const GameRecord = Backbone.Model.extend({
  defaults: {
    winner_id: undefined,
    looser_id: undefined,
    type_id: undefined,
    created_at: undefined
  },

  intialize: function () {

  },

  urlRoot: 'api/games',
  url: function () {
    if (this.id !== undefined) { return this.urlRoot + this.id }
    return this.urlRoot
  }

})
