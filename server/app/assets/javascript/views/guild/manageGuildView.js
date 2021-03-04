import { Guild } from '../../models/guild_model.js'

export const ManageGuildView = Backbone.View.extend({
  events: {
    'click .createGuild': 'createGuild',
    'click .inviteMember': 'inviteMember',
    'click .kickMember': 'kickMember',
    'click .promoteMember': 'promoteMember',
    'click .relegateMember': 'relegateMember',
    'click .updateGuildName': 'updateGuildName',
    'click .updateGuildAnagram': 'updateGuildAnagram',
    'click .leaveGuild': 'leaveGuild',
    'keyup #nonMemberToInvite': function () { this.nicknameSearch(this.nonMembersList, 'nonMemberToInvite', '#inviteMemberResult') },
    'keyup #memberToKick': function () { this.nicknameSearch(this.membersList, 'memberToKick', '#memberToKickResult') },
    'keyup #memberToPromote': function () { this.nicknameSearch(this.membersList, 'memberToPromote', '#promoteMemberResult') },
    'keyup #memberToRelegate': function () { this.nicknameSearch(this.officersList, 'memberToRelegate', '#relegateMemberResult') }
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
    if (this.users.get(this.userId).get('guild_id') == undefined) {
      this.createGuildView()
    } else {
      this.guild = this.guilds.get(this.users.get(this.userId).get('guild_id'))
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
          this.users.fetch()
          this.guilds.fetch()
          this.preload()
        } catch (error) {
          this.$el.html(Handlebars.templates.createGuild({}))
          this.renderError(error, '#errorField', Handlebars.templates.guildError)
        }
      }
      createAGuild()
    }
  },

  manageGuildView: function () {
    this.$el.html(Handlebars.templates.manageGuild(JSON.parse(JSON.stringify(this.guild))))

    const ownerBool = (this.id == this.guilds.get('owner_id'))
    const officerBool = (this.guild.get('officer_ids').includes(this.id) || this.id === this.guilds.get('owner_id'))
    this.list(ownerBool, officerBool)

    if (ownerBool) {
      this.$el.find('#ownerPannel').html(Handlebars.templates.ownerPannel({}))
      this.$el.find('#officerPannel').html(Handlebars.templates.officerPannel({}))
      console.log(JSON.stringify(this.membersList))
      console.log(JSON.stringify(this.nonMembersList))
      console.log(JSON.stringify(this.officersList))
    }
    if (officerBool) {
      this.$el.find('#officerPannel').html(Handlebars.templates.officerPannel({}))
    }
    this.$el.find('#memberPannel').html(Handlebars.templates.memberPannel({}))
  },

  leaveGuild: function () {
    console.log('leaveGuild')
  },

  inviteMember: function () {
    console.log('invite member not implemented yet')
  },

  kickMember: function () {
    console.log('kick member not implemented yet')
  },

  promoteMember: function () {
    console.log('promote member')
    // trouver le moyen de recup l'id correctement
    const member = document.getElementById('memberToPromote').value
    if (!this.guild.get('officer_ids').includes(member.id)) {
      const array = this.guild.get('officer_ids')
    }
    array.push(member.id)
    const patchAGuild = async () => {
      try {
        const response = await this.guild.save({ officer_ids: array }, { patch: true })
        this.users.fetch()
        this.guilds.fetch()
        this.preload()
      } catch (error) {
        this.preload()
        console.log(JSON.stringify(error.responseJSON))
        // this.renderError(error, '#errorField', Handlebars.templates.guildError)
      }
    }
    patchAGuild()
  },

  relegateMember: function () {
    console.log('relegateMember')
  },

  updateGuildName: function () {
    const name = document.getElementById('guildName').value
    const patchAGuild = async () => {
      try {
        const response = await this.guild.save({ name: name }, { patch: true })
        this.users.fetch()
        this.guilds.fetch()
        this.preload()
      } catch (error) {
        this.preload()
        this.renderError(error, '#nameError', Handlebars.templates.guildError)
      }
    }
    patchAGuild()
  },

  updateGuildAnagram: function () {
    const anagram = document.getElementById('guildAnagram').value
    const patchAGuild = async () => {
      try {
        const response = await this.guild.save({ anagram: anagram }, { patch: true })
        this.users.fetch()
        this.guilds.fetch()
        this.preload()
      } catch (error) {
        this.preload()
        this.renderError(error, '#anagramError', Handlebars.templates.guildError)
      }
    }
    patchAGuild()
  },

  nicknameSearch: function (list, input, target) {
    const value = document.getElementById(input).value
    if (!value.length) {
      this.$el.find(target).html(Handlebars.templates.nicknameSearchResult({}))
      return
    }
    this.search = list.slice().filter(el => el.nickname.toLowerCase().includes(value.toLowerCase()) === true)
    const context = JSON.parse(JSON.stringify(this.search))
    this.$el.find(target).html(Handlebars.templates.nicknameSearchResult(context))
    console.log(JSON.parse(JSON.stringify(this.search)))
  },

  render: function () {
    return this
  },

  emptyError: function (name, anagram) {
    if (!name.length) { this.$el.find('#nameError').html("Error: name can't be empty") }
    if (!anagram.length) { this.$el.find('#anagramError').html("Error: anagram can't be empty") }
  },

  renderError: function (error, target, template) {
    this.$el.find(target).html(template({
      status: error.status,
      statusText: error.statusText,
      body: JSON.stringify(error.responseJSON)
    }))
  },

  list: function (owner, officer) {
    if (!owner && !officer) { return }
    this.nonMembersList = Array()
    this.membersList = Array()
    this.officersList = Array()
    for (let i = 1; i <= this.users.length; i++) {
      if (owner && this.guild.get('officer_ids').includes(this.users.get(i).get('id'))) {
        this.officersList.push({
          nickname: this.users.get(i).get('nickname'),
          id: this.users.get(i).get('id')
        })
      }
      if (officer && this.users.get(i).get('guild_id') === this.guild.get('id') &&
			!this.guild.get('officer_ids').includes(this.users.get(i).get('id')) &&
			this.users.get(i).get('id') != this.guild.get('owner_id')) {
	       this.membersList.push({
	          nickname: this.users.get(i).get('nickname'),
	          id: this.users.get(i).get('id')
	      })
      } else if (officer && this.users.get(i).get('guild_id') == undefined) {
        this.nonMembersList.push({
				 	nickname: this.users.get(i).get('nickname'),
				 	id: this.users.get(i).get('id')
		 			})
      }
    }
  }
})
