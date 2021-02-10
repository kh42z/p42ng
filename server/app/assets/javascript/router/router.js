import { homeView } from '../views/home_view.js'
import { UsersView } from '../views/users_view.js'
import { pongView } from '../views/pong_view.js'
import { Users } from '../collections/users_collection'

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.homeView = homeView
    this.usersView = new UsersView()
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
    const users = new Users()

    async function userFetch () {
      await users.fetch({
        url: users.urlRoot,
        headers: {
        // Authentification
          client: '_TYEEhyVWtrUSw92O-1iZg',
          'access-token': 'daceCjCc0F-cA_ouqz5d7w',
          uid: '56065'
        },
        success: function (response) {
          console.log(response)
        },
        error: function (errorResponse) {
          console.log('error')
          console.log(errorResponse)
        }
      })

      const user = users.get('1')
      const usersView = new UsersView({ model: user })
      usersView.render()
    }

    userFetch()
  },

  pong_view: function (url) {
    console.log('in pong view')
    this.pongView.render()
  }
})
