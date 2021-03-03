import { Users } from '../collections/users_collection'
import { ChatModel } from '../models/chatModel'
import { User } from '../models/user_model'
import { Channels } from '../collections/channels'

export const ChatView = Backbone.View.extend({
  events: {
    'click .add_channel': 'modalCreateChannel',
    'click .createChannel': 'createChannel',
    'click .closeModal': 'modalClose',
    'keyup .input': 'sendMessage',
    'click .eachFriendModalCreateChannel': 'selectCheckbox',
    'click .eachFriendModalCreateDirectMessages': 'createDM',
    'keyup .search': 'modalSearchFriends',
    'keyup .inputModalSearchAllChannels': 'inputModalSearchAllChannels',
    'click .add_direct_messages': 'openModalCreateDM',
    'click .close-icon': 'deleteChannelConfirmation',
    'click .search_channel': 'openModalSearchChannel',
    'click .eachChannel': 'subscribeChannel',
    'click .yes': 'deleteChannel',
    'click .no': 'modalClose'
  },
  initialize: function () {
    this.myChannels = this.model.get('myChannels').get('obj')
    this.channels = this.model.get('channels').get('obj')
    this.users = this.model.get('users').get('obj')
    this.userLogged = new User()

    this.userLogged.fetchUser(window.localStorage.getItem('user_id'))

    this.myChannels.on('remove', function () {
      this.channels.fetchAllChannels()
    }, this)

    this.listenTo(this.myChannels, 'sync', function () {
      this.listenTo(this.users, 'sync', function () {
        this.render()
      }, this)
    }, this)
  },
  defaults: {
    channels: undefined,
    userLogged: undefined,
    users: undefined
  },
  el: $('#app'),
  render: function () {
    this.templateChat = Handlebars.templates.chat
    const array = {}

    // if multiple participants right side open
    array.channel = true

    // my channels
    const channels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
    array.myChannels = Array()
    for (let i = 0; i < channels.length; i++) {
      array.myChannels.push(JSON.parse(JSON.stringify(channels[i])))
      array.myChannels[i].admin = channels[i].get('admin_ids').find(el => el === this.userLogged.get('id'))
    }

    // direct messages
    const DM = this.myChannels.slice().filter(el => el.get('privacy') === 'direct_message')
    array.DM = Array()
    for (let i = 0; i < DM.length; i++) {
      array.DM.push(JSON.parse(JSON.stringify(DM[i])))
      const id = DM[i].get('participant_ids').find(el => el !== this.userLogged.get('id'))
      array.DM[i].image_url = this.users.get(id).get('image_url')
      array.DM[i].nickname = this.users.get(id).get('nickname')
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
    this.context.friends = JSON.parse(JSON.stringify(this.users))
    const html = this.templateChat(this.context)
    const found = $(html).find('#modalCreateChannel')[0].innerHTML
    const friendsDiv = document.getElementById('modalCreateChannel')
    friendsDiv.innerHTML = found
  },

  modalClose: function () {
    const checkboxes = document.getElementsByClassName('checkbox')
    for (const el of checkboxes) {
      el.checked = false
    }
    document.getElementById('error-message').style.display = 'none'
    Array.prototype.forEach.call(document.getElementsByClassName('modal'),
      function (el) {
        el.style.display = 'none'
      })
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
        const response = await newChannel.createChannel(name, participantsIds, 'public')
        this.myChannels.add(newChannel)
        this.channels.add(newChannel)
        this.modalClose()
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

  modalSearchFriends: function (e) {
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const search = this.users.slice().filter(function (el) {
      if (el.get('nickname').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      if (el.get('anagram') !== undefined && el.get('anagram').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    })
    this.context.friends = JSON.parse(JSON.stringify(search))
    const html = this.templateChat(this.context)
    const find = 'friends' + e.currentTarget.getAttribute('id')
    const found = $(html).find('#' + find)[0].innerHTML
    const friendsDiv = document.getElementById(find)
    friendsDiv.innerHTML = found
  },

  modalSearchChannels: function () {
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const search = this.channels.slice().filter(function (el) {
      if ((el.get('privacy') === 'public' || el.get('privacy') === 'protected') &&
        el.get('name').toLowerCase().startsWith(value.toLowerCase()) === true) {
        return true
      }
      return false
    })
    this.context.channels = JSON.parse(JSON.stringify(search))
    const html = this.templateChat(this.context)
    const found = $(html).find('#searchAllChannel')[0].innerHTML
    const searchAllChannelDiv = document.getElementById('searchAllChannel')
    searchAllChannelDiv.innerHTML = found
  },

  inputModalSearchAllChannels: function (e) {
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const search = this.channels.slice().filter(function (el) {
      if ((el.get('privacy') === 'public' || el.get('privacy') === 'protected') &&
      el.get('name').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    })
    this.context.channels = JSON.parse(JSON.stringify(search))
    const html = this.templateChat(this.context)
    const found = $(html).find('#searchAllChannel')[0].innerHTML
    const friendsDiv = document.getElementById('searchAllChannel')
    friendsDiv.innerHTML = found
  },

  openModalCreateDM: function () {
    this.context.friends = JSON.parse(JSON.stringify(this.users))
    const html = this.templateChat(this.context)
    const found = $(html).find('#modalCreateDirectMessages')[0].innerHTML
    const friendsDiv = document.getElementById('modalCreateDirectMessages')
    friendsDiv.innerHTML = found
    document.getElementById('modalCreateDirectMessages').style.display = 'flex'
  },

  createDM: function (e) {
    const id = e.currentTarget.getAttribute('for')
    const newChannel = new ChatModel()
    const participantsIds = new Array()
    participantsIds.push(id)
    const name = this.users.get(id).get('nickname') + this.userLogged.get('nickname')
    const createChannel = async () => {
      try {
        const response = await newChannel.createChannel(name, participantsIds, 'direct_message')
        this.myChannels.add(newChannel)
        this.modalClose()
        this.render()
      } catch (error) {
        console.log(error.responseJSON.message)
      }
    }
    createChannel()
  },

  deleteChannel: function () {
    const id = document.getElementById('modalValidationDeleteChannel').getAttribute('for')
    console.log(id)
    this.myChannels.get(id).leaveRoom()
    this.myChannels.remove(id)
    const disc = document.getElementById('channel' + id)
    disc.remove()
  },

  deleteChannelConfirmation: function (e) {
    const id = e.currentTarget.getAttribute('for')
    if (this.myChannels.get(id).get('privacy') !== 'direct_message') {
      if (this.myChannels.get(id).get('admin_ids').find(el => el === this.userLogged.get('id'))) {
        document.getElementById('modalValidationDeleteChannel').style.display = 'flex'
        document.getElementById('modalValidationDeleteChannel').setAttribute('for', id)
      } else {
        this.myChannels.get(id).leaveRoom()
        this.myChannels.remove(id)
        const disc = document.getElementById('channel' + id)
        disc.remove()
      }
    }
  },

  openModalSearchChannel: function () {
    const channels = this.channels.slice().filter(function (el) {
      if (el.get('privacy') === 'public' || el.get('privacy') === 'protected') {
        return true
      }
      return false
    })
    this.context.channels = JSON.parse(JSON.stringify(channels))
    const html = this.templateChat(this.context)
    const found = $(html).find('#searchAllChannel')[0].innerHTML
    const friendsDiv = document.getElementById('searchAllChannel')
    friendsDiv.innerHTML = found
    document.getElementById('modalSearchAllChannels').style.display = 'flex'
  },

  subscribeChannel: function (e) {
    const id = e.currentTarget.getAttribute('for')
    const channel = this.channels.get(id)
    channel.subscribeChannel()
    this.myChannels.add(channel)
    this.modalClose()
    this.render()
  }
})
