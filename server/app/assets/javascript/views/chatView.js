export const ChatView = Backbone.View.extend({
  events: {
    'click .add_box': 'modalCreateChannel',
    'click .close': 'modalCreateChannelClose',
    'keyup .input': 'sendMessage',
    'click .eachFriend': 'selectCheckbox'
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

    // if multiple participants right side open
    array.multipleParticipants = true

    // discussions
    array.discussions = Array() // this.channels.length
    for (let i = 0; i < 16; i++) {
      array.discussions.push({
        multipleParticipants: array.multipleParticipants,
        admin: true,
        anagram: '[24.c+]',
        image_url: './images/profile-pic.jpg',
        nickname: 'pganglof-with-very-long-name'
      })
      const length = array.discussions[i].anagram.length + array.discussions[i].nickname.length
      if (length > 17) {
        const size = 16 - array.discussions[i].anagram.length
        array.discussions[i].nickname = array.discussions[i].nickname.substr(0, size) + '.'
      }
    }

    // header center
    array.anagram = '[24.c]'
    array.slide_show = './icons/slideshow.svg'

    // history messages
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

    // right side
    array.privacy = 'Public'
    array.usersOnline = Array() // nb usersOnline
    array.nbOnline = '4'
    array.nbInGame = '1'
    array.nbOffline = '0'
    for (let i = 0; i < 4; i++) {
      array.usersOnline.push({
        anagram: '[txt]',
        image_url: './images/jdurand.png',
        nickname: 'jdurand123456789',
        others: true
      })
      const length = array.usersOnline[i].anagram.length + array.usersOnline[i].nickname.length
      if (length > 17) {
        const size = 16 - array.usersOnline[i].anagram.length
        array.usersOnline[i].nickname = array.usersOnline[i].nickname.substr(0, size) + '.'
        console.log(array.usersOnline[i].nickname)
      }
    }

    // in game
    array.usersInGame = Array() // nb usersOnline
    for (let i = 0; i < 1; i++) {
      array.usersInGame.push({
        anagram: '[txt]',
        image_url: './images/jdurand.png',
        nickname: 'jdurand123456789'
      })
      const length = array.usersInGame[i].anagram.length + array.usersInGame[i].nickname.length
      if (length > 17) {
        const size = 16 - array.usersInGame[i].anagram.length
        array.usersInGame[i].nickname = array.usersInGame[i].nickname.substr(0, size) + '.'
        console.log(array.usersInGame[i].nickname)
      }
    }

    // offline
    array.usersOffline = Array() // nb usersOnline
    for (let i = 0; i < 1; i++) {
      array.usersOffline.push({
        anagram: '[txt]',
        image_url: './images/jdurand.png',
        nickname: 'jdurand123456789'
      })
      const length = array.usersOffline[i].anagram.length + array.usersOffline[i].nickname.length
      if (length > 17) {
        const size = 16 - array.usersOffline[i].anagram.length
        array.usersOffline[i].nickname = array.usersOffline[i].nickname.substr(0, size) + '.'
        console.log(array.usersOffline[i].nickname)
      }
    }

    // modal create channel
    array.friends = Array() // nb users
    for (let i = 0; i < 2; i++) {
      array.friends.push({
        anagram: '[txt]',
        image_url: './images/jdurand.png',
        nickname: 'jdurand',
        checkboxId: i
      })
    }

    // error message
    array.error_message = 'Validation failed: Can\'t be blanck'
    // array.error_message = false

    // checkbox

    const context = array
    const templateDataChat = this.templateChat(context)
    this.$el.html(templateDataChat)
    return this
  },

  selectCheckbox: function () {
    let htmlFor = document.getElementsByClassName('eachFriend')
    console.log(htmlFor)
    console.log(htmlFor[0].getAttribute('.name'))
    htmlFor = document.getElementsByClassName('checkbox')
    if (htmlFor.checked === true) { htmlFor.checked = false } else { htmlFor.checked = true }
  },

  modalCreateChannel: function () {
    document.getElementById('modalCreateChannel').style.display = 'flex'
  },

  modalCreateChannelClose: function () {
    document.getElementById('modalCreateChannel').style.display = 'none'
  },

  createChannel: function () {
    const adminIds = Array()
    adminIds.push(this.userLogged.get('id'))
    this.channels.createChannel(adminIds)
  },

  sendMessage: function (e) {
    if (e.keyCode === 13) { console.log('send message') } else { console.log('not enter') }
  }
})
