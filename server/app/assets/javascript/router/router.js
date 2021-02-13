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
    this.headerView = new HeaderView()
    this.headerView.render()
    this.profileController = new ProfileController()
    this.guildController = new GuildController()
    // this.usersView = new UsersView()
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
    connexion: 'connexion_view',
    '': 'home_view'
    // '': 'oauth_view'
  },

  oauth_view: function (url) {
    const oauthView = new OauthView()
  },

  connexion_view: function (url) {
    this.oauthService = new OauthService()
    const homeView = new HomeView()
    homeView.render()
  },

  home_view: function (url) {
    const homeView = new HomeView()
    homeView.render()
  },

  users_view: function (url) {
    const user = new User('/api/users/1', this.oauthService)
    const usersView = new UsersView({ model: user })
  },

  pong_view: function (url) {
    console.log('in pong view')
    const pongView = new PongView()
    pongView.render()
  },

  profile_view: function (id, page) {
    console.log('profile ' + id + page)
    //	let profileController = new ProfileController(id, page, "model control not implemented yet")
    this.profileController.loadView(id, page, 'model control not implemented yet')
  },

  guilds_view: function () {
    const guild = new Guild({ oauthService: this.oauthService })
    // guild.create('/api/guilds')
    guild.set({
      name: 'teste',
      anagram: 'azedz',
      owner_id: 1
    })
    guild.save()
    console.log('guild_list')
    // const guilds = new Guilds()
    // const guildsView = new GuildsView({ collection: guilds })
  },

  guild_view: function (id, page) {
    console.log('guild ' + id + page)
    this.guildController.loadView(id, page, 'a model')
  },

  chat_view: function (id, page) {
    console.log('chat ' + id + page)
  },

  leaderboard_view: function () {
    console.log('leaderboard')
    const leaderboardView = new LeaderboardView()
    leaderboardView.render()
  },

  tournaments_view: function () {
    console.log('Tournaments')
    const tournamentsView = new TournamentsView()
    tournamentsView.render()
  }
})
