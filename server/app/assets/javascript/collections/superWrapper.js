import { Wrapper } from '../models/wrapper.js'

/*
export const SuperWrapper = Backbone.Collection.extend({
  initialize: function () {
    this.on('all', function (e) {
    })
	//	this.fetch();
  },
  model: Wrapper,
  urlRoot: '',
  url: function () {
    return this.urlRoot
  }
})*/

export const SuperWrapper = Backbone.Model.extend({
	default:
	{
		users: undefined,
		guilds: undefined,
		ladders: undefined,
		userLogged: undefined
	}
})
