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
    array.discussions = Array(2) // this.channels.length
    // for (let i = 0; i < 1; i++) {
    array.discussions.push({
      anagram: '[24.c]',
      image_url: './images/profile-pic.jpg',
      nickname: 'pganglof'
    })
    array.discussions.push({
      anagram: '[24.c]',
      image_url: './images/jdurand.png',
      nickname: 'jdurand'
    })
    // }
    array.anagram = '[24.c]'
    array.slide_show = './icons/slideshow.svg'

    array.messages = Array(30)
    for (let i = 0; i < 30; i++) {
      array.messages.push({
        anagram: '[24.c]',
        image_url: './images/profile-pic.jpg',
        nickname: 'pganglof',
        time: i,
        message: 'ptite game?'
      })
    }
    const context = array
    const templateDataChat = this.templateChat(context)
    this.$el.html(templateDataChat)
    return this
  },
  createChannel: function () {
    const adminIds = Array()
    adminIds.push(this.userLogged.get('id'))
    this.channels.createChannel(adminIds)
  }
})
