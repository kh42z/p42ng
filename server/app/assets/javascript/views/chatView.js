export const ChatView = Backbone.View.extend({
  initialize: function () {
    console.log(this.model)
    this.render()
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
