import { Ladders } from '../../collections/laddersCollection.js'

export const AchivementsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.template = Handlebars.templates.achivements
    this.ladders = new Ladders()
    this.users = this.model.get('users').get('obj')
   	// this.guilds = this.model.get('guilds').get('obj')

    this.listenTo(this.ladders, 'sync', function () { this.getLadders() }, this)
    // this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
  },

  getLadders: function () {
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  render: function () {
    const context =	{
      name: this.users.get(this.id).get('nickname'),
      ladder_id: this.users.get(this.id).get('ladder_id'),
      ladder_name: this.ladders.get(this.users.get(this.id).get('ladder_id')).get('name'),
      guild_id: this.users.get(this.id).get('guild_id'),
      id: this.id
    }

    this.$el.html(this.template(context))
    this.$el.find('#profilePannel').html(Handlebars.templates.profilePannel(context))
    this.$el.find('#profileSubNavBar').html(Handlebars.templates.profileSubNavBar(context))
    return this
  }
})
