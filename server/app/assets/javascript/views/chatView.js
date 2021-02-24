export const ChatView = Backbone.View.extend({
  events: {
    'click .add_box': 'createChannel'
  },
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
    console.log('chat render')
    console.log(this.channels)
    this.templateChat = Handlebars.templates.chat
    let array = {}

    array = JSON.parse(JSON.stringify(this.userLogged))
    console.log(array)
    array.discussions = Array(1) // this.channels.length
    for (let i = 0; i < 1; i++) {
      array.discussions.push({
        image_url: './images/profile-pic.jpg',
        nickname: 'nickname'
      })
    }
    console.log(array)
    console.log(array.discussions)
    const context = array
    const templateDataChat = this.templateChat(context)
    this.$el.html(templateDataChat)
    return this
  },
  createChannel: function () {

  }
})
