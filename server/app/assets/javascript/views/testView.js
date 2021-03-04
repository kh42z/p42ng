import { SuperWrapper } from '../collections/superWrapper.js'
import { Wrapper } from '../models/wrapper.js'
import { Users } from '../collections/users_collection.js'
import { Guilds } from '../collections/guilds_collection.js'

export const TestView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.userLogged = this.model.get('userLogged').get('obj')
    this.listenTo(this.guilds, 'sync', function () {
      this.render()
    }, this)
    this.listenTo(this.userLogged, 'sync', function () {
      console.log(this.userLogged.get('nickname'))
    }, this)
  },

  render: function () {
    this.$el.html('test in render')
    console.log(this.guilds.at(0).get('name'))
    return this
  }
})
