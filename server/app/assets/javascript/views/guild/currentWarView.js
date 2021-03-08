export const CurrentWarView = Backbone.View.extend({
  initialize: function () {
    this.guildSubNavBar = Handlebars.templates.guildSubNavBar
    this.guildPannel = Handlebars.templates.guildPannel
    // Handlebars.registerPartial('/', '{{guildSubNavBar}}')
    this.template = Handlebars.templates.currentWar
    this.guilds = this.model.get('guilds').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.render() }, this)
  },
  el: $('#app'),
  render: function () {
    const context = JSON.parse(JSON.stringify(this.guilds.get(this.id)))
    this.$el.html(this.template(context))

    this.$el.find('#guildPannel').html(this.guildPannel(context))
    this.$el.find('#guildSubNavBar').html(this.guildSubNavBar(context))
    return this
  }
})
