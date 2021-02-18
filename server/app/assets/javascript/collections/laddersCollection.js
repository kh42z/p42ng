import { Ladder } from '../models/ladderModel'

export const Ladders = Backbone.Collection.extend({
  initialize: function (url) {
    this.on('all', function (e) {
      //
    })
		this.fetch();
  },
  model: Ladder,
  urlRoot: '/api/ladders/',
  url: function () {
    return this.urlRoot
  }
})
