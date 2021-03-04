export const NoGuildView = Backbone.View.extend({
  initialize: function () {
    this.template = Handlebars.templates.noGuild
    this.guilds = this.model.get('guilds').get('obj')
    this.users = this.model.get('users').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  el: $('#app'),
  render: function () {
    const context = {
      guild_id: this.users.get(this.id).get('guild_id'),
      id: this.id
    }
    this.$el.html(this.template(context))
    this.$el.find('#profilePannel').html(Handlebars.templates.profilePannel(context))
    this.$el.find('#profileSubNavBar').html(Handlebars.templates.profileSubNavBar(context))
    return this
  }
})
