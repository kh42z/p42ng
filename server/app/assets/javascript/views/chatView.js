export const ChatView = Backbone.View.extend({
  initialize: function () {
		this.channels = this.model.get('channels').get('obj')
		this.userLogged = this.model.get('userLogged').get('obj')
    console.log(this.model)

		this.listenTo(this.channels, 'sync', function () {
			this.render()
		}, this)
  },
  el: $('#app'),
  render: function () {
    this.templateChat = Handlebars.templates.chat
    let array = {}

    array = JSON.parse(JSON.stringify(this.model))
		for (let i = 0; i < )

    const context = array
    const templateDataChat = this.templateChat(context)
    this.$el.html(templateDataChat)
    return this
  }
})
