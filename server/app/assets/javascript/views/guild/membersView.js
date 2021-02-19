export const MembersView = Backbone.View.extend({
  initialize: function () {
    this.users = this.model.get('users').get('obj')
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
    // this.render()
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  render: function () {
    const template = Handlebars.templates.guild_members
    const members = Array()

    for (let i = 1; i <= this.users.length; i++) {
      if (this.users.get(i).get('guild_id') == this.id) // get here ????
      { members.push(JSON.parse(JSON.stringify(this.users.at(i)))) }
    }

    const context = {
      guild_name: this.guilds.at(this.id).get('name'),
      anagram: this.guilds.at(this.id).get('anagram'),
      members: members
    }
    // console.log(templateData)
    const templateData = template(context)
    console.log(this.guilds.at(this.id).get('name'))

    this.$el.html(templateData)
    return this
  }

})
