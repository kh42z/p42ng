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
    this.templateChat = Handlebars.templates.chat
    let array = {}

    array = JSON.parse(JSON.stringify(this.userLogged))
    array.discussions = Array(16) // this.channels.length
    for (let i = 0; i < 16; i++) {
      array.discussions.push({
        admin: true,
        anagram: '[24.c+]',
        image_url: './images/profile-pic.jpg',
        nickname: 'pganglof-with-very-long-name'
      })
      const length = array.discussions[array.discussions.length - 1].anagram.length + array.discussions[array.discussions.length - 1].nickname.length
      if (length > 17) {
        const size = 16 - array.discussions[array.discussions.length - 1].anagram.length
        array.discussions[array.discussions.length - 1].nickname = array.discussions[array.discussions.length - 1].nickname.substr(0, size) + '.'
      }
    }
    array.anagram = '[24.c]'
    array.slide_show = './icons/slideshow.svg'

    array.messages = Array(30) // size of nb history messages
    for (let i = 0; i < 30; i++) {
      array.messages.push({
        anagram: '[24.c]',
        image_url: './images/profile-pic.jpg',
        nickname: 'pganglof-with-very-long-name',
        time: i,
        message: 'ptite game?'
      })
    }

    array.privacy = 'Public'
    array.usersOnline = Array(2) // nb usersOnline
    array.nbOnline = '2'
    for (let i = 0; i < 1; i++) {
      array.usersOnline.push({
        anagram: '[txt]',
        image_url: './images/jdurand.png',
        nickname: 'jdurand',
        others: true
      })
      array.usersOnline.push({
        anagram: '[txt]',
        image_url: './images/profile-pic.jpg',
        nickname: 'pganglof',
        others: false
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
