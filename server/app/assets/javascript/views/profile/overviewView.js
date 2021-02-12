import { Guild } from "../../models/guild_model.js"
import { Ladder } from "../../models/ladderModel.js"

export const ProfileOverviewView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.templateProfileOverview = Handlebars.templates.profileOverview
	//	this.userHandler = new UserHandler()
		this.listenTo(this.model, 'sync', function () {
			this.getGuild()
		}, this)

	//	while (this.model.get("guildModel") === undefined) ;
		console.log("dsqds")
		//this.userHandler = new UserHandler()
  },

	getGuild: function ()
	{
		this.guild = new Guild(this.model.get("guild_id"))
		this.listenTo(this.guild, 'sync', function () {
			this.getLadder()
		}, this)
	},

	getLadder: function()
	{
//		this.ladder = new Ladder(0)
	//	this.listenTo(this.ladder, 'sync', function () {
			this.render()
		//}, this)
	},

  render: function () {
		const context = {
			nickname: this.model.get("nickname"),
			user_mmr: this.model.get("mmr"),
			user_guild: this.guild.get("anagram"),
			user_guild_id: this.model.get("guild_id")
		//	user_ladder: this.ladder.get("name")
		}

		//const templateProfileOverview = Handlebars.templates.profileOverview
		const templateData = this.templateProfileOverview(context)
		//console.log(this.model.get('nickname'))
		console.log("overview")
		console.log(templateData)
    this.$el.html(templateData)
		return this
  }
})
