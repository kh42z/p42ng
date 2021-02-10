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
          client: '3wy2VwUgD-pEv7gWJJh9dw',
          'access-token': 'xT4ql1Yq2ALJDSG9cgh1kA',
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
