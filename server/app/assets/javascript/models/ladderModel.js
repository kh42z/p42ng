export const Ladder = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    desc: undefined,
    mmr_threshold: undefined
  },

  initialize: function () {
  },

  urlRoot: 'api/ladders/',
  url: function () {
    if (this.id !== undefined) { return this.urlRoot + this.id }
    return this.urlRoot
  }
})
