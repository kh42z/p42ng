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
import { TwoFactorView } from '../views/oauth/twoFactorView.js'
import { SearchView } from '../views/search/searchView.js'
import { ChatView } from '../views/chatView'
import { ManageGuildView } from '../views/guild/manageGuildView.js'
import { AdminView } from '../views/admin/adminView.js'

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
import { GameRecords } from '../collections/gameRecords.js'

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
    admin: 'admin_view',
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
    manage_guild: 'manage_guild_view',
    connexion: 'connexion',
    exit: 'exit',
    firstConnexion: 'firstConnexion_view',
    two_factor_connexion: 'two_factor_connexion',
    twoFactor: 'twoFactor_view',
    'search(/:item)': 'search_view',
    'search(/:item)/': 'search_view',
    '': 'oauth_view'
  },

  connexion: function (url) {
    // Two-Factor redirection
    this.urlParams = new URLSearchParams(window.location.search)
    if (this.urlParams.get('two_factor')) {
      window.localStorage.setItem('user_id', this.urlParams.get('user_id'))
      this.navigate('#twoFactor', { trigger: true })
      return
    }

    const fetchUser = async () => {
      this.oauthService.setAjaxEnvironnement()
      this.oauthService.ajaxSetup()
      await this.userLogged.fetchUser(window.localStorage.getItem('user_id'))
      this.userLogged.save({ first_login: true }, { patch: true })
      if (this.userLogged.get('first_login')) { this.navigate('#firstConnexion', { trigger: true }) } else {
        this.navigate('#home', { trigger: true })
      }
    }
    fetchUser()
  },

  two_factor_connexion: function (url) {
    const fetchUser = async () => {
      this.oauthService.ajaxSetup()
      await this.userLogged.fetchUser(window.localStorage.getItem('user_id'))
      this.navigate('#home', { trigger: true })
    }
    fetchUser()
  },

  accessPage: function (url) {
    console.log('accessPageview')
    if (window.localStorage.getItem('access-token') === null) {
      console.log('oauth view')
      this.oauth_view()
      return 1
    } else if (performance.navigation.type >= 0 && performance.navigation.type <= 2) {
      const fetchUser = async () => {
        console.log('fetch user')
        this.oauthService = new OauthService()
        this.oauthService.ajaxSetup()
        await this.userLogged.fetchUser(window.localStorage.getItem('user_id'))
        if (url !== 'firstConnexion' || url !== 'twoFactor') { this.headerView.render() }
      }
      fetchUser()
    }
  },

  firstConnexion_view: function () {
    if (this.accessPage('firstConnexion')) { return }
    const firstConnexionView = new FirstConnexionView({ model: this.userLogged })
  },

  twoFactor_view: function () {
    const twoFactorView = new TwoFactorView()
  },

  exit: function () {
    const fetchAPI = new FetchAPI()
    fetchAPI.exit()
    window.localStorage.clear()
    this.oauth_view()
  },

  admin_view: function () {
    const adminView = new AdminView({ model: this.loadWrapper() })
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
    const pongView = new PongView()
  },

  profile_view: function (id, page) {
    if (this.accessPage()) { return }
    console.log('profile view')
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
    // const chatView = new ChatView({ model: this.loadChannelWrapper(userLogged) })
    const chatView = new ChatView({ model: this.loadChannelWrapper() })
    // chatView.render()
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

  search_view: function (item) {
    if (this.accessPage()) { }
    // let searchView
    // const searchView = new SearchView({ model: this.loadWraper(item) })
    // console.log(searchView.item)
  },

  manage_guild_view: function () {
    if (this.accessPage()) { }
    const manageGuildView = new ManageGuildView({ model: this.loadWrapper() })
  },

  loadWrapper: function () {
    return new SuperWrapper({
      users: new Wrapper({ obj: new Users() }),
      guilds: new Wrapper({ obj: new Guilds() }),
      ladders: new Wrapper({ obj: new Ladders() }),
      gameRecords: new Wrapper({ obj: new GameRecords() }),
      userLoggedId: window.localStorage.getItem('user_id'),
      router: this
    })
  },

  loadChannelWrapper: function () {
    const userId = window.localStorage.getItem('user_id')
    const superWrapper = new SuperWrapper({
      users: new Wrapper({ obj: new Users() }),
      myChannels: new Wrapper({ obj: new Channels() }),
      channels: new Wrapper({ obj: new Channels() })
    })
    superWrapper.get('myChannels').get('obj').fetchByUserId(userId)
    superWrapper.get('channels').get('obj').fetchAllChannels()
    return superWrapper
  }
})
