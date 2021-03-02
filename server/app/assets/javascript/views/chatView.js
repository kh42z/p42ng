import { Users } from '../collections/users_collection'
import { ChatModel } from '../models/chatModel'
import { User } from '../models/user_model'
import { Channels } from '../collections/channels'

export const ChatView = Backbone.View.extend({
  events: {
    'click .add_channel': 'modalCreateChannel',
    'click .createChannel': 'createChannel',
    'click .close': 'modalCreateChannelClose',
    'keyup .input': 'sendMessage',
    'click .eachFriendModalCreateChannel': 'selectCheckbox',
    'click .eachFriendModalCreateDirectMessages': 'createDirectMessages',
    'keyup .modalSearch': 'modalSearch',
    'click .add_direct_messages': 'openModalCreateDirectMessages'
  },
  initialize: function () {
    this.channels = this.model.get('channels').get('obj')
    this.users = this.model.get('users').get('obj')

    this.listenTo(this.channels, 'sync', function () {
      this.listenTo(this.users, 'sync', function () {
        console.log(this.users)
        this.userLogged = this.users.get(window.localStorage.getItem('user_id'))
        console.log(this.userLogged)
        this.search = this.users
        this.render()
      }, this)
    }, this)
  },
  defaults: {
    search: undefined,
    channels: undefined,
    userLogged: undefined,
    users: undefined
  },
  el: $('#app'),
  render: function () {
    this.templateChat = Handlebars.templates.chat
    const array = {}

    // array = JSON.parse(JSON.stringify(this.userLogged))

    // if multiple participants right side open
    array.channel = true

    // channels
    const channels = this.channels.slice().filter(el => el.get('privacy') !== 'direct_message')
    console.log(channels)
    array.channels = Array()
    for (let i = 0; i < channels.length; i++) {
      console.log(channels[i])
      array.channels.push(JSON.parse(JSON.stringify(channels[i])))
      array.channels[i].admin = channels[i].get('admin_ids').find(el => el === this.userLogged.get('id'))
    }

    // direct messages
    const directMessages = this.channels.slice().filter(el => el.get('privacy') === 'direct_message')
    array.directMessages = Array()
    for (let i = 0; i < directMessages.length; i++) {
      array.directMessages.push(JSON.parse(JSON.stringify(directMessages[i])))
      const id = directMessages[i].get('participant_ids').find(el => el !== this.userLogged.get('id'))
      array.directMessages[i].image_url = this.users.get(id).get('image_url')
      array.directMessages[i].nickname = this.users.get(id).get('nickname')
    }

    // header center
    array.image_url = './images/profile-pic.jpg'
    array.anagram = '[24.c]'
    array.nickname = 'pganglof'
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

    array.friends = this.search
    array.friends = JSON.parse(JSON.stringify(array.friends))

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
    document.getElementById('modalSearchChannels').value = ''
    document.getElementById('modalSearchDirectMessages').value = ''
    document.getElementById('channelName').value = ''
    const checkboxes = document.getElementsByClassName('checkbox')
    for (const el of checkboxes) {
      el.checked = false
    }
    document.getElementById('error-message').style.display = 'none'
    document.getElementById('modalCreateChannel').style.display = 'none'
    document.getElementById('modalCreateDirectMessages').style.display = 'none'
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
        this.modalCreateChannelClose()
        this.render()
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
    this.search = this.users.slice().filter(function (el) {
      if (el.get('nickname').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      if (el.get('anagram') !== undefined && el.get('anagram').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    }
    )
    this.context.friends = JSON.parse(JSON.stringify(this.search))
    const html = this.templateChat(this.context)
    const found = $(html).find('#friends')[0].innerHTML
    const friendsDiv = document.getElementById('friends')
    friendsDiv.innerHTML = found
  },

  openModalCreateDirectMessages: function () {
    document.getElementById('modalCreateDirectMessages').style.display = 'flex'
  },

  createDirectMessages: function (e) {
    const id = e.currentTarget.getAttribute('for')
    const newChannel = new ChatModel()
    const participantsIds = new Array()
    participantsIds.push(id)
    const name = this.users.get(id).get('nickname') + this.userLogged.get('nickname')
    const createChannel = async () => {
      try {
        const response = await newChannel.createChannel(name, participantsIds, 'direct_message')
        this.channels.add(newChannel)
        this.modalCreateChannelClose()
        this.render()
      } catch (error) {
        console.log(error.responseJSON.message)
      }
    }
    createChannel()
  }
})
