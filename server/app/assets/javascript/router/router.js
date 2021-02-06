import { appView } from '../views/app.js'
import { usersView } from '../views/users_view'
import { pongView } from '../views/pong.js'

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.appView = appView
    this.usersView = usersView
    this.pongView = pongView
    console.log('In router initialize')
  },

  routes:
  {
    users: 'users_view',
    home: 'home_view',
    pong: 'pong_view'
  },

  home_view: function (url) {
    console.log('in home route')
    this.appView.render()
  },

  users_view: function (url) {
    console.log('in users_view route')
    this.usersView.render()
  },

  pong_view: function (url) {
    console.log('in pong view')
    this.pongView.render()
  }
})
