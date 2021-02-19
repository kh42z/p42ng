import { Ladders } from '../../collections/laddersCollection.js'

export const AchivementsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.ladders = new Ladders()
    this.users = this.model.get('users').get('obj')
   	// this.guilds = this.model.get('guilds').get('obj')

    this.listenTo(this.ladders, 'sync', function () { this.getLadders() }, this)
    // this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
  },

  getUsers: function () {
    console.log('hello')
  },

  getLadders: function () {
    console.log('it me')
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  render: function () {
    console.log('Achivements View')
    const context =	{
      name: this.users.get(this.id).get('nickname'),
      ladder_id: this.users.get(this.id).get('ladder_id'),
      ladder_name: this.ladders.get(this.users.get(this.id).get('ladder_id')).get('name')
    }
    const template = Handlebars.templates.achivements

    this.$el.html(template(context))
    return this
  }
})
