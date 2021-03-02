import { ChatModel } from '../models/chatModel'

export const ChatView = Backbone.View.extend({
  events: {
    'click .add_box': 'modalCreateChannel',
    'click .createChannel': 'createChannel',
    'click .close': 'modalCreateChannelClose',
    'keyup .input': 'sendMessage',
    'click .eachFriend': 'selectCheckbox',
    'keyup .modalSearch': 'modalSearch'
  },
  initialize: function () {
    this.channels = this.model.get('channels').get('obj')
    this.userLogged = this.model.get('userLogged').get('obj')
    this.users = this.model.get('users').get('obj')

    this.listenTo(this.channels, 'sync', function () {
      this.listenTo(this.users, 'sync', function () {
        this.search = this.users
        this.render()
      }, this)
    }, this)
  },
  defaults: {
    search: undefined
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
      }
    }

    // modal create channel
    array.friends = this.search
    array.friends = JSON.parse(JSON.stringify(array.friends))
    // array.friends = Array() // nb users
    // for (let i = 0; i < this.users.length; i++) {
    //   array.friends.push(this.users[i])
    //   // array.friends.push({
    //   //   anagram: '[txt]',
    //   //   image_url: './images/jdurand.png',
    //   //   nickname: 'jdurand',
    //   //   id: i
    //   // })
    // }

    // error message
    // array.error_message = 'Validation failed: Can\'t be blank'
    // array.error_message = false

    // checkbox

    this.context = array
    const templateDataChat = this.templateChat(this.context)
    this.$el.html(templateDataChat)
    return this
  },

  selectCheckbox: function (e) {
    const id = e.currentTarget.getAttribute('for')
    const checkbox = document.getElementById(id)
    if (checkbox.checked === true) { checkbox.checked = false } else { checkbox.checked = true }
  },

  modalCreateChannel: function () {
    document.getElementById('modalCreateChannel').style.display = 'flex'
  },

  modalCreateChannelClose: function () {
    this.context.friends = JSON.parse(JSON.stringify(this.users))
    const html = this.templateChat(this.context)
    const found = $(html).find('#friends')[0].innerHTML
    const friendsDiv = document.getElementById('friends')
    friendsDiv.innerHTML = found
    document.getElementById('modalSearch').value = ''
    document.getElementById('channelName').value = ''
    const checkboxes = document.getElementsByClassName('checkbox')
    for (const el of checkboxes) {
      el.checked = false
    }
    document.getElementById('modalCreateChannel').style.display = 'none'
  },

  createChannel: function () {
    const checkboxes = document.getElementsByClassName('checkbox')
    const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked === true)
    const participantsIds = Array.from(selectedCboxes, x => x.value)
    const adminIds = [this.userLogged.id]
    const name = document.getElementById('channelName').value
    const newChannel = new ChatModel()
    const createChannel = async () => {
      try {
        console.log('create channel')
        const response = await newChannel.createChannel(name, participantsIds)
        this.channels.add(newChannel)
        this.modelCreateChannelClose()
      } catch (error) {
        document.getElementById('error-message').innerHTML = error.responseJSON.message
        document.getElementById('error-message').style.display = 'block'
      }
    }
    createChannel()
  },

  sendMessage: function (e) {
    if (e.keyCode === 13) { console.log('send message') } else { console.log('not enter') }
  },

  modalSearch: function (e) {
    const value = document.getElementById('modalSearch').value
    this.search = this.users.slice().filter(el => el.get('nickname').startsWith(value) === true)
    this.context.friends = JSON.parse(JSON.stringify(this.search))
    const html = this.templateChat(this.context)
    const found = $(html).find('#friends')[0].innerHTML
    const friendsDiv = document.getElementById('friends')
    friendsDiv.innerHTML = found
  }
})
