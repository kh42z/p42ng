export const GuildView = Backbone.View.extend({
  events: {
    'click #currentWar': 'currentWar',
    'click #lastWars': 'lastWars',
    'click #members': 'members'
  },
  el: $('#app'),
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.users = this.model.get('users').get('obj')
    this.ladders = this.model.get('ladders').get('obj')
    console.log(this.id)
    if (this.id === null) { this.id = this.userId }
    console.log(this.id)
    this.$el.html(Handlebars.templates.guild({}))
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.currentWar() }, this)
    this.$el.find('#guildSubNavBar').html(Handlebars.templates.guildSubNavBar({}))
    this.renderPannel()
  },

  currentWar: function () {
    const context = JSON.parse(JSON.stringify(this.guilds.get(this.id)))
    this.$el.find('#guildcontent').html(Handlebars.templates.currentWar(context))
    return this
  },

  lastWars: function () {
    const context = JSON.parse(JSON.stringify(this.guilds.get(this.id)))
    this.$el.find('#guildcontent').html(Handlebars.templates.lastWars(context))

    return this
  },

  members: function () {
    const members = []
    const officers = []

    for (let i = 1; i <= this.users.length; i++) {
      if (this.users.get(i).get('guild_id') == this.id &&
			this.users.get(i).get('id') !== this.guilds.get(this.id).get('owner_id') &&
			this.guilds.get(this.id).get('officer_ids').includes(this.users.get(i).get('id')) === false) {
        members.push(JSON.parse(JSON.stringify(this.users.get(i))))
      }
    }

    for (let i = 0; i < this.guilds.get(this.id).get('officer_ids').length; i++) {
      officers.push({
        nickname: this.users.get(this.guilds.get(this.id).get('officer_ids')[i]).get('nickname'),
        id: this.users.get(this.guilds.get(this.id).get('officer_ids')[i]).get('id')
      })
    }
    console.log(this.guilds.get(this.id).get('owner_id'))
    const context = {
      name: this.guilds.get(this.id).get('name'),
      id: this.id,
      anagram: this.guilds.get(this.id).get('anagram'),
      owner_id: this.guilds.get(this.id).get('owner_id'),
      owner_nickname: this.users.get(this.guilds.get(this.id).get('owner_id')).get('nickname'),
      members: members,
      officers: officers
    }

    this.$el.find('#guildcontent').html(Handlebars.templates.guildMembers(context))
    return this
  },

  renderPannel: function () {
    console.log('ici')
    this.$el.find('#guildPannel').html(Handlebars.templates.guildPannel({}))
  }
})
