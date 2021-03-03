import { Guild } from '../../models/guild_model.js'

export const ManageGuildView = Backbone.View.extend({
  events: {
    'click .createGuild': 'createGuild'
  },
  el: $('#app'),
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.users = this.model.get('users').get('obj')
    this.userId = this.model.get('userLoggedId')
    this.router = this.model.get('router')
    this.preload()
  },

  preload: function () {
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.chooseView() }, this)
  },

  chooseView: function () {
    if (this.users.get(this.userId).get('guildId') == undefined) {
      this.createGuildView()
    } else {
      this.manageGuildView()
    }
  },

  createGuildView: function () {
    console.log('create your guild')
    this.$el.html(Handlebars.templates.createGuild({}))
  },

  createGuild: function () {
    const name = document.getElementById('guildName').value
    const anagram = document.getElementById('guildAnagram').value
    if (name == '' || anagram == '') {
      this.emptyError(name, anagram)
    } else {
      const guild = new Guild()
      console.log('ici dans create')
      const createAGuild = async () => {
        try {
          console.log('create a guild, try')
	        const response = await guild.create(name, anagram)
          console.log(response)
          console.log('Guild creation success')
          this.preload()
        } catch (error) {
          this.$el.html(Handlebars.templates.createGuild({}))
          console.log(error.statusText)
          this.$el.find('#errorField').html('Error: ' + error.status + ': ' + error.statusText)
        }
      }
      createAGuild()
    }
  },

  manageGuildView: function () {
    console.log('manage your guild: promote, fire, relegate users ect ...')
  },

  render: function () {
    return this
  },

  emptyError: function (name, anagram) {
    console.log('ici')
    if (name == '') { this.$el.find('#nameError').html("Error: name can't be empty") }
    if (anagram == '') { this.$el.find('#anagramError').html("Error: anagram can't be empty") }
  }
})
