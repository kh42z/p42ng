// views
import { HomeView } from '../views/home_view.js'
import { UsersView } from '../views/profile/users_view.js'
import { PongView } from '../views/pong/pong_view.js'
import { HeaderView } from '../views/header_view'
import { LeaderboardView } from '../views/leaderboard/leaderboardView.js'
import { TournamentsView } from '../views/tournaments/tournamentsView.js'
import { GuildsView } from '../views/guild/guildsView.js'

// controlers
import { ProfileController } from '../views/profile/profileController.js'
import { GuildController } from '../views/guild/guildController.js'

//models and collection
import { User } from '../models/user_model'
import { Guilds } from '../collections/guilds_collection.js'

// import { ChatController } from '../view/chat/chatController.js' // not here

export const Router = Backbone.Router.extend({
  initialize: function () {
    this.headerView = new HeaderView()
    this.headerView.render()
		this.profileController = new ProfileController
		this.guildController = new GuildController
    // this.usersView = new UsersView()
  },

  routes:
  {
    user_page: 'users_view', // Achanger nom de route et tout
    home: 'home_view',
    pong: 'pong_view',
		"profile/:id(/:page)": 'profile_view',
		"profile/:id/": 'profile_view',
		"guilds": 'guilds_view',
		"guild/:id(/:page)": 'guild_view',
		"guild/:id/": 'guild_view',
		"chat/:id(/:page)": 'chat_view',
		"leaderboard": 'leaderboard_view',
		"tournaments": 'tournaments_view',
		"": "home_view"
  },

  home_view: function (url) {
		let homeView = new HomeView()
  },

  users_view: function (url) {
    const user = new User('/api/users/1')
    const usersView = new UsersView({ model: user })
    // usersView.render()
  },

  pong_view: function (url) {
    console.log('in pong view')
		let pongView = new PongView()
	},

	profile_view: function (id, page) {
		console.log("profile " + id + page)
	//	let profileController = new ProfileController(id, page, "model control not implemented yet")
		this.profileController.loadView(id, page, "model control not implemented yet")
	},

	guilds_view: function () {
		console.log("guild_list")
	//	let guilds = new Guilds('/api/guilds/')
		let guildsView = new GuildsView()
	},

	guild_view: function (id, page) {
		console.log("guild " + id + page)
		this.guildController.loadView(id, page, "a model")
	},

	chat_view: function (id, page) {
		console.log("chat " + id + page)
	},

	leaderboard_view: function () {
		console.log("leaderboard")
		let leaderboardView = new LeaderboardView()
	},

	tournaments_view: function () {
		console.log("Tournaments")
		let tournamentsView = new TournamentsView()
	}
})
