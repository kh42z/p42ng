export const ChatView = Backbone.View.extend({
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.userLogged = this.model.get('userLogged').get('obj')
    this.listenTo(this.guilds, 'sync', function () {
      this.render()
    }, this)
    this.listenTo(this.userLogged, 'sync', function () {
      console.log(this.userLogged.get('nickname'))
    }, this)
  },
  el: $('#app'),
  render: function () {
    const templateChat = Handlebars.templates.chat

    const context = {}
    const templateDataChat = templateChat(context)
    this.$el.html(templateDataChat)
    return this
  }
})
