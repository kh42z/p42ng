export const LastWarsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    console.log('yes')
    this.guildSubNavBar = Handlebars.templates.guildSubNavBar
    this.guildPannel = Handlebars.templates.guildPannel
    this.template = Handlebars.templates.lastWars
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.render() }, this)
  },
  render: function () {
    const context = JSON.parse(JSON.stringify(this.guilds.get(this.id)))
    this.$el.html(this.template(context))
    this.$el.find('#guildPannel').html(this.guildPannel(context))
    this.$el.find('#guildSubNavBar').html(this.guildSubNavBar(context))

    return this
  }
})
