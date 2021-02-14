// views
import { HomeView } from '../views/home_view.js'
import { UsersView } from '../views/profile/usersView.js'
import { PongView } from '../views/pong/pong_view.js'
import { HeaderView } from '../views/header_view'
import { LeaderboardView } from '../views/leaderboard/leaderboardView.js'
import { TournamentsView } from '../views/tournaments/tournamentsView.js'
import { OauthView } from '../views/oauth/oauthView.js'
import { GuildsView } from '../views/guild/guildsView.js'

// models
import { User } from '../models/user_model'
import { Guild } from '../models/guild_model.js'

// controlers
import { ProfileController } from '../views/profile/profileController.js'
import { GuildController } from '../views/guild/guildController.js'

// models and collection
import { Guilds } from '../collections/guilds_collection.js'
import { Users } from '../collections/users_collection.js'

// import { ChatController } from '../view/chat/chatController.js' // not here

// services
import { OauthService } from '../service/oauthService.js'

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.oauthService = undefined
    this.userLogged = new User()
    this.headerView = new HeaderView({ model: this.userLogged })
    this.profileController = new ProfileController()
    this.guildController = new GuildController()
  },

  routes:
  {
    user_page: 'users_view', // Achanger nom de route et tout
    home: 'home_view',
    pong: 'pong_view',
    'profile/:id(/:page)': 'profile_view',
    guilds: 'guilds_view',
    'guild/:id(/:page)': 'guild_view',
    'chat/:id(/:page)': 'chat_view',
    leaderboard: 'leaderboard_view',
    tournaments: 'tournaments_view',
    connexion: 'connexion',
    exit: 'oauth_view',
    '': 'oauth_view'
  },

  connexion: function (url) {
    this.oauthService = new OauthService()
    this.userLogged.getUser(window.localStorage.getItem('user_id'))
    this.navigate('#home', { trigger: true })
  },

  refresh: function () {
    this.userLogged.getUser(window.localStorage.getItem('user_id'))
    this.headerView = new HeaderView({ model: this.userLogged })
  },

  accessPage: function () {
    if (window.localStorage.getItem('access-token') === null) {
      this.oauth_view()
      return 1
    } else if (performance.navigation.type === 1) { this.refresh() }
  },

  oauth_view: function (url) {
    if (this.headerView !== undefined) { this.headerView.remove() }
    window.localStorage.clear()
    history.replaceState({}, null, '/')
    const oauthView = new OauthView()
  },

  home_view: function (url) {
    if (this.accessPage()) { return }
    const homeView = new HomeView()
  },

  users_view: function (url) {
    if (this.accessPage()) { return }
    const usersView = new UsersView({ model: this.userLogged })
  },

  pong_view: function (url) {
    if (this.accessPage()) { return }
    const pongView = new PongView()
    pongView.render()
  },

  profile_view: function (id, page) {
    if (this.accessPage()) { return }
    //	let profileController = new ProfileController(id, page, "model control not implemented yet")
    this.profileController.loadView(id, page, 'model control not implemented yet')
  },

  guilds_view: function () {
    if (this.accessPage()) { return }
    const guild = new Guild()
    const guilds = new Guilds()
    const guildsView = new GuildsView({ collection: guilds })
  },

  guild_view: function (id, page) {
    if (this.accessPage()) { return }
    this.guildController.loadView(id, page, 'a model')
  },

  chat_view: function (id, page) {
    if (this.accessPage()) { }
  },

  leaderboard_view: function () {
    if (this.accessPage()) { return }
    const leaderboardView = new LeaderboardView()
    leaderboardView.render()
  },

  tournaments_view: function () {
    if (this.accessPage()) { return }
    const tournamentsView = new TournamentsView()
    tournamentsView.render()
  }
})
