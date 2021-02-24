// views
import { HomeView } from '../views/home_view.js'
import { UsersView } from '../views/profile/usersView.js'
import { PongView } from '../views/pong/pong_view.js'
import { HeaderView } from '../views/header_view'
import { LeaderboardView } from '../views/leaderboard/leaderboardView.js'
import { TournamentsView } from '../views/tournaments/tournamentsView.js'
import { OauthView } from '../views/oauth/oauthView.js'
import { GuildsView } from '../views/guild/guildsView.js'
import { FirstConnexionView } from '../views/oauth/firstConnexionView.js'
import { ChatView } from '../views/chatView'

// models
import { User } from '../models/user_model'
import { Guild } from '../models/guild_model.js'

// controlers
import { ProfileController } from '../views/profile/profileController.js'
import { GuildController } from '../views/guild/guildController.js'

// models and collection
import { Guilds } from '../collections/guilds_collection.js'
import { Users } from '../collections/users_collection.js'
import { Ladders } from '../collections/laddersCollection.js'
import { Wrapper } from '../models/wrapper.js'
import { SuperWrapper } from '../collections/superWrapper.js'
import { Channels } from '../collections/channels'

// import { ChatController } from '../view/chat/chatController.js' // not here

// services
import { OauthService } from '../services/oauthService.js'

// Views for test only
import { TestView } from '../views/testView.js'
import { FetchAPI } from '../services/fetchAPI.js'

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.userLogged = new User()
    this.headerView = new HeaderView({ model: this.userLogged })
    this.profileController = new ProfileController()
    this.guildController = new GuildController()
    this.superWrapper = undefined
    this.oauthService = new OauthService()
  },

  routes:
  {
    user_page: 'users_view', // Achanger nom de route et tout
    home: 'home_view',
    pong: 'pong_view',
    'profile/:id(/:page)': 'profile_view',
    'profile/:id(/:page)/': 'profile_view',
    guilds: 'guilds_view',
    'guild/:id(/:page)': 'guild_view',
    'guild/:id(/:page)/': 'guild_view',
    'chat/:id(/:page)': 'chat_view',
    chat: 'chat_view',
    leaderboard: 'leaderboard_view',
    tournaments: 'tournaments_view',
    connexion: 'connexion',
    exit: 'exit',
    firstConnexion: 'firstConnexion_view',
    '': 'oauth_view'
  },

  connexion: function (url) {
    const fetchUser = async () => {
      this.oauthService.setAjaxEnvironnement()
      this.oauthService.ajaxSetup()
      await this.userLogged.fetchUser(window.localStorage.getItem('user_id'))
      if (this.userLogged.get('first_login')) { this.navigate('#firstConnexion', { trigger: true }) } else {
        this.navigate('#home', { trigger: true })
      }
    }
    fetchUser()
  },

  accessPage: function (url) {
    if (window.localStorage.getItem('access-token') === null) {
      this.oauth_view()
      return 1
    } else if (performance.navigation.type === 1 || performance.navigation.type === 2) {
      const fetchUser = async () => {
        this.oauthService = new OauthService()
        this.oauthService.ajaxSetup()
        await this.userLogged.fetchUser(window.localStorage.getItem('user_id'))
        if (url !== 'firstConnexion') { this.headerView.render() }
      }
      fetchUser()
    }
  },

  firstConnexion_view: function () {
    if (this.accessPage('firstConnexion')) { return }
    const firstConnexionView = new FirstConnexionView({ model: this.userLogged })
  },

  exit: function () {
    const fetchAPI = new FetchAPI()
    fetchAPI.exit()
    window.localStorage.clear()
    this.oauth_view()
  },

  oauth_view: function (url) {
    if (this.headerView !== undefined) { this.headerView.remove() }
    history.replaceState({}, null, '/')
    const oauthView = new OauthView()
  },

  home_view: function (url) {
    if (this.accessPage()) { return }
    this.headerView.render()
    const homeView = new HomeView()
  },

  users_view: function (url) {
    if (this.accessPage()) { return }
    const usersView = new UsersView({ model: this.userLogged })
  },

  pong_view: function (url) {
    if (this.accessPage()) { return }
    const pongView = new PongView({ model: this.loadWrapper() })
    pongView.render()
  },

  profile_view: function (id, page) {
    if (this.accessPage()) { return }
    this.profileController.loadView(id, page, this.loadWrapper())
  },

  guilds_view: function () {
    if (this.accessPage()) { return }
    const guildsView = new GuildsView({ model: this.loadWrapper() })
  },

  guild_view: function (id, page) {
    if (this.accessPage()) { return }
    this.guildController.loadView(id, page, this.loadWrapper())
  },

  chat_view: function (id, page) {
    if (this.accessPage()) { return }
    const chatView = new ChatView({ model: this.loadChannelWrapper() })
  },

  leaderboard_view: function () {
    if (this.accessPage()) { return }
    const leaderboardView = new LeaderboardView({ model: this.loadWrapper() })
  },

  tournaments_view: function () {
    if (this.accessPage()) { return }
    const tournamentsView = new TournamentsView({ model: this.loadWrapper() })
  },

  test_view: function () {
    if (this.accessPage()) { return }
    const testView = new TestView({ model: this.loadWrapper() })
  },

  loadWrapper: function () {
    return new SuperWrapper({
      users: new Wrapper({ obj: new Users() }),
      guilds: new Wrapper({ obj: new Guilds() }),
      userLogged: new Wrapper({ obj: this.userLogged })
    })
  },

  loadChannelWrapper: function () {
    return new SuperWrapper({
      userLogged: new Wrapper({ obj: this.userLogged }),
      channels: new Wrapper({ obj: new Channels({ participant_id: this.userLogged.get('id') }) })
    })
  }
})
