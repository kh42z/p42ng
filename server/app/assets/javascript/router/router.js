import { homeView } from '../views/home_view.js'
import { UsersView } from '../views/users_view.js'
import { pongView } from '../views/pong_view.js'
import { User } from '../models/user_model'
import { HeaderView } from '../views/header_view'

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.headerView = new HeaderView()
    this.headerView.render()
    this.homeView = homeView
    // this.usersView = new UsersView()
    this.pongView = pongView
  },

  routes:
  {
    user_page: 'users_view',
    home: 'home_view',
    pong: 'pong_view'
  },

  home_view: function (url) {
    this.homeView.render()
  },

  users_view: function (url) {
    const user = new User('/api/users/1')
    const usersView = new UsersView({ model: user })
    // usersView.render()
  },

  pong_view: function (url) {
    console.log('in pong view')
    this.pongView.render()
  }
})
