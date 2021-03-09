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
    'keyup #memberToKick': function () { this.nicknameSearch(this.membersList, 'memberToKick', '#KickMemberResult') },
    'keyup #memberToPromote': function () { this.nicknameSearch(this.membersList, 'memberToPromote', '#promoteMemberResult') },
    'keyup #memberToRelegate': function () { this.nicknameSearch(this.officersList, 'memberToRelegate', '#relegateMemberResult') },
    'mouseover .nicknameSearchElement': function (e) { this.outlineNickname(e) },
    'mouseout .nicknameSearchElement': function (e) { e.target.style.color = '' },
    'click .nicknameSearchElement': function (e) { this.clickNickname(e) }
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
    this.listenToOnce(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    this.listenToOnce(this.users, 'sync', function () { this.chooseView() }, this)
  },

  chooseView: function () {
    // console.log(this.users.get(this.userId).get('guild_id'))
    if (this.users.get(this.userId).get('guild_id') === undefined ||
		this.users.get(this.userId).get('guild_id') === null) {
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
          this.users.fetch() // mettre a jour juste coté front
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
    this.$el.html(Handlebars.templates.manageGuild({}))
    this.$el.find('#guildManageIntro').html(Handlebars.templates.guildManageIntro(JSON.parse(JSON.stringify(this.guild))))
    const ownerBool = (this.id == this.guilds.get('owner_id'))
    const officerBool = (this.guild.get('officer_ids').includes(this.id) || this.id === this.guilds.get('owner_id'))
    this.list(ownerBool, officerBool)

    if (ownerBool) {
      this.$el.find('#ownerPannel').html(Handlebars.templates.ownerPannel({}))
      this.$el.find('#officerPannel').html(Handlebars.templates.officerPannel({}))
      // console.log(JSON.stringify(this.membersList))
      // console.log(JSON.stringify(this.nonMembersList))
      // console.log(JSON.stringify(this.officersList))
    } else if (officerBool) {
      this.$el.find('#officerPannel').html(Handlebars.templates.officerPannel({}))
    }
    this.$el.find('#memberPannel').html(Handlebars.templates.memberPannel({}))
  },

  leaveGuild: function () { // a travailler
    const leaveGuild = async () => {
      try {
        const response = await this.createRequest('/members/' + this.userId, 'DELETE')
        this.renderError(response, '#guildGlobalError', Handlebars.templates.guildError)
        // this.$el.find('#guildGlobalError').style.color = 'green'
        this.users.get(id).set({ guild_id: null })
        // virer les autre trucks en front (owner, ect ..)
        this.$el.html('<p>You successfully leaved the guild</p>')
      } catch (e) {
        this.renderError(e, '#guildGlobalError', Handlebars.templates.guildError)
      } finally {
      }
    }
    leaveGuild()
  },

  inviteMember: function () {
    // console.log('invite member not implemented yet')
    const nickname = document.getElementById('nonMemberToInvite').value
    let id
    if (this.users.findWhere({ nickname: nickname })) {
    	id = this.users.findWhere({ nickname: nickname }).id
    } else {
      console.log('error') // a gerer
      return
    }
    const inviteMember = async () => {
      try {
        const response = await this.createRequest('/members' + '/' + id, 'POST')
        /*				console.log('success_ici')
				this.updateLists([this.membersList, this.nonMembersList], nickname, id)
				this.users.get(id).set({ guild_id: this.guild.id }) */
        // this.renderError(response, '#guildGlobalError', Handlebars.templates.guildError)
        // this.$el.find('#guildGlobalError').style.color = 'green'
      } catch (e) {
        console.log(e.status)
        console.log(e)
        this.renderError(e, '#guildGlobalError', Handlebars.templates.guildError)
        if (e.status == 200) {
          console.log('success')
          this.updateLists([this.membersList, this.nonMembersList], nickname, id)
          this.users.get(id).set({ guild_id: this.guild.id })
        }
      } finally {
      }
    }
    inviteMember()
  },

  kickMember: function () {
    const nickname = document.getElementById('memberToKick').value
    let id
    if (this.users.findWhere({ nickname: nickname })) {
      id = this.users.findWhere({ nickname: nickname }).id
    } else {
      console.log('error') // a gerer
      return
    }
    const kickMember = async () => {
      try {
        const response = await this.createRequest('/members/' + id, 'DELETE')
        this.updateLists([this.nonMembersList, this.membersList], nickname, id)
        this.users.get(id).set({ guild_id: null })
        // this.$el.find('#guildGlobalError').style.color = 'green'
      } catch (e) {
        console.log(e)
        this.renderError(e, '#guildGlobalError', Handlebars.templates.guildError)
        console.log(e.status)
        if (e.status == 200) {
          /*	this.updateLists([this.nonMembersList, this.membersList], nickname, id)
	        this.users.get(id).set({ guild_id: null }) */
        }
      } finally {
      }
    }
    kickMember()
  },

  promoteMember: function () {
    const nickname = document.getElementById('memberToPromote').value
    let id
    if (this.users.findWhere({ nickname: nickname })) {
      id = this.users.findWhere({ nickname: nickname }).id
    } else {
      console.log('error') // a gerer
      return
    }
    const promoteMember = async () => {
      try {
        const response = await this.createRequest('/officers/' + id, 'POST')
        this.renderError(response, '#guildGlobalError', Handlebars.templates.guildError)
        console.log('success ici dans promote')
        this.updateLists([this.officersList, []], nickname, id)
        this.guild.get('officer_ids').push(id)
        console.log('success ici dans promote')
        // this.$el.find('#guildGlobalError').style.color = 'green'
      } catch (e) {
        console.log(e)
        this.renderError(e, '#guildGlobalError', Handlebars.templates.guildError)
        if (e.status == 200) {
          this.updateLists([this.officersList, []], nickname, id)
          this.guild.get('officer_ids').push(id)
        }
      } finally {
      }
    }
    promoteMember()
  },

  relegateMember: function () {
    const nickname = document.getElementById('memberToRelegate').value
    let id
    if (this.users.findWhere({ nickname: nickname })) {
      id = this.users.findWhere({ nickname: nickname }).id
    } else {
      console.log('error') // a gerer
      return
    }
    const relegateMember = async () => {
      try {
        const response = await this.createRequest('/officers/' + id, 'DELETE')
        // this.renderError(response, '#guildGlobalError', Handlebars.templates.guildError)
        this.updateLists([Array(), this.officersList], nickname, id)
        this.guild.set({ officer_ids: this.guild.get('officer_ids').filter(el => el != id) })
        // this.$el.find('#guildGlobalError').style.color = 'green'
      } catch (e) {
        console.log(e)
        this.renderError(e, '#guildGlobalError', Handlebars.templates.guildError)
        console.log(e.status)
        if (e.status == 200) {
          this.updateLists([Array(), this.officersList], nickname, id)
          this.guild.set({ officer_ids: this.guild.get('officer_ids').filter(el => el != id) })
        }
      } finally {
      }
    }
    relegateMember()
  },

  updateGuildName: function () {
    const name = document.getElementById('guildName').value
    const patchAGuild = async () => {
      try {
        const response = await this.guild.save({ name: name }, { patch: true })
      } catch (e) {
        console.log(e)
        if (e.status != 200) { this.renderError(e, '#nameError', Handlebars.templates.guildError) } else {
          this.guild.set({ name: name })
          this.$el.find('#guildManageIntro').html(Handlebars.templates.guildManageIntro(JSON.parse(JSON.stringify(this.guild))))
        }
      }
    }
    patchAGuild()
  },

  updateGuildAnagram: function () {
    const anagram = document.getElementById('guildAnagram').value
    const patchAGuild = async () => {
      try {
        const response = await this.guild.save({ anagram: anagram }, { patch: true })
      } catch (e) {
        console.log(e)
        // this.preload()
        if (e.status != 200) { this.renderError(e, '#anagramError', Handlebars.templates.guildError) } else {
          this.guild.set({ anagram: anagram })
	        this.$el.find('#guildManageIntro').html(Handlebars.templates.guildManageIntro(JSON.parse(JSON.stringify(this.guild))))
        }
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
    const context = { search: JSON.parse(JSON.stringify(this.search)), input: input }
    this.$el.find(target).html(Handlebars.templates.nicknameSearchResult(context))
  },

  outlineNickname: function (e) {
    e.target.style.color = 'purple'
  },

  clickNickname: function (e) {
    const target = e.target.parentElement.id
    this.$el.find('#' + target)[0].value = e.target.innerHTML
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
      if (officer && this.users.get(i).get('guild_id') === this.guild.get('id')) {
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
  },

  updateLists: function (l, nickname, id) {
    console.log('yes ici')
    if (l[0].length > 0) {
      console.log(1)
      l[0].push({
        nickname: nickname,
        id: id
	 })
    }
	 if (l[1].length > 0) {
		 console.log(2)
	 for (let i = 0; i < l[1].length; i++) {
        if (l[1][i].id === id) {
          l[1].splice(i, 1)
          break
        }
      }
    }
  },

  createRequest: function (path, method) {
    return $.ajax({
      url: '/api/guilds/' + this.guild.id + path,
      method: method
      // data: data
    })
  }
})
