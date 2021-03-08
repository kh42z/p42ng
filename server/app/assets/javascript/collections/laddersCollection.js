import { Ladder } from '../models/ladderModel.js'

export const Ladders = Backbone.Collection.extend({
  initialize: function () {
    this.fetch()
  },
  model: Ladder,
  urlRoot: '/api/ladders',
  url: function () {
    return this.urlRoot
  }
})
