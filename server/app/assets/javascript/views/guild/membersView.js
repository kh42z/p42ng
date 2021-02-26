export const MembersView = Backbone.View.extend({
  initialize: function () {
    this.users = this.model.get('users').get('obj')
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
    // this.render()
  },
  el: $('#app'),

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  render: function () {
    const template = Handlebars.templates.guildMembers
    const members = Array()
    const officers = Array()

    for (let i = 1; i <= this.users.length; i++) {
      if (this.users.get(i).get('guild_id') == this.id) { members.push(JSON.parse(JSON.stringify(this.users.get(i)))) }
    }

    for (let i = 0; i < this.guilds.get(this.id).get('officer_ids').length; i++) {
      officers.push({
        nickname: this.users.get(this.guilds.get(this.id).get('officer_ids')[i]).get('nickname'),
        id: this.users.get(this.guilds.get(this.id).get('officer_ids')[i]).get('id')
      })
    }

    const context = {
      name: this.guilds.get(this.id).get('name'),
      id: this.id,
      anagram: this.guilds.get(this.id).get('anagram'),
      owner_id: this.guilds.get(this.id).get('owner_id'),
      owner_nickname: this.users.get(this.guilds.get(this.id).get('owner_id')).get('nickname'),
      members: members,
      officers: officers
    }
    // console.log(templateData)
    const templateData = template(context)
    console.log(this.guilds.get(this.id).get('name'))
    console.log(templateData)

    this.$el.html(templateData)
    return this
  }

})
