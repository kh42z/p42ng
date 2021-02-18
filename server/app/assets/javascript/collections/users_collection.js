import { User } from '../models/user_model'

export const Users = Backbone.Collection.extend({
  initialize: function () {
    this.on('all', function (e) {
    })
		this.fetch();
  },
  model: User,
  urlRoot: '/api/users/',
  url: function () {
    return this.urlRoot
  }
})
