import { Wrapper } from '../models/wrapper.js'

/*
export const SuperWrapper = Backbone.Collection.extend({
  initialize: function () {
    this.on('all', function (e) {
    })
  //  this.fetch();
  },
  model: Wrapper,
  urlRoot: '',
  url: function () {
    return this.urlRoot
  }
}) */

// important // NOTE:
// This order when listenTo several models is important
// wait for guilds then users work but the opposite no
// ?????

export const SuperWrapper = Backbone.Model.extend({
  defaults: {
    users: undefined,
    guilds: undefined,
    ladders: undefined,
    userLogged: undefined,
    channels: undefined
  }
})
