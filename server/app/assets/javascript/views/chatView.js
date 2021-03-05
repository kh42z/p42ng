import { Users } from '../collections/users_collection'
import { ChatModel } from '../models/chatModel'
import { User } from '../models/user_model'
import { Channels } from '../collections/channels'

export const ChatView = Backbone.View.extend({
  events: {
    'click .add_channel': 'openModalCreateChannel',
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
    'click .no': 'modalClose',
    'click .clickable-discussions': 'openChat'
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
        this.users.remove(window.localStorage.getItem('user_id'))
        this.render()
      }, this)
    }, this)
  },
  defaults: {
    myChannels: undefined,
    channels: undefined,
    userLogged: undefined,
    users: undefined
  },
  el: $('#app'),
  render: function () {
    this.templateChat = Handlebars.templates.chat
    const array = {}

    // if multiple participants right side open

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
      array.DM[i].anagram = this.users.get(id).get('anagram')
      array.DM[i].nickname = this.users.get(id).get('nickname')
    }

    // header center
    let userChat
    if (this.myChannels.length > 0) {
      const currentChannel = this.myChannels.at(0)
      array.privacy = currentChannel.get('privacy')[0].toUpperCase() + currentChannel.get('privacy').slice(1)
      if (currentChannel.get('privacy') === 'direct_message') {
        const id = currentChannel.get('participant_ids').find(el => el !== this.userLogged.get('id'))
        userChat = this.users.get(id)
        array.channel = false
        array.image_url = userChat.get('image_url')
        array.anagram = userChat.get('anagram')
        array.nickname = userChat.get('nickname')
        const status = userChat.get('status')
        array.status = status
        if (status === 'ingame') {
          array.slide_show = './icons/slideshow-ingame.svg'
        } else {
          array.slide_show = './icons/slideshow.svg'
        }
      } else {
        array.channel = true
        array.name = currentChannel.get('name')
      }

      // history messages

      array.messages = Array() // size of nb history messages
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
      const usersOnline = this.users.slice().filter(function (el) {
        const id = el.get('id')
        if (currentChannel.get('participant_ids').find(el2 => el2 == id) && el.get('status') === 'online') { return true }
        return false
      })
      const usersInGame = this.users.slice().filter(function (el) {
        const id = el.get('id')
        if (currentChannel.get('participant_ids').find(el2 => el2 == id) && el.get('status') === 'ingame') { return true }
        return false
      })
      const usersOffline = this.users.slice().filter(function (el) {
        const id = el.get('id')
        if (currentChannel.get('participant_ids').find(el2 => el2 == id) && el.get('status') === 'offline') { return true }
        return false
      })
      array.nbOnline = usersOnline.length
      array.nbOffline = usersOffline.length
      array.nbInGame = usersInGame.length
      array.usersOnline = Array()
      for (let i = 0; i < usersOnline.length; i++) {
        array.usersOnline.push(usersOnline[i])
        const length = array.usersOnline[i].anagram.length + array.usersOnline[i].nickname.length
        if (length > 17) {
          const size = 16 - array.usersOnline[i].anagram.length
          array.usersOnline[i].nickname = array.usersOnline[i].nickname.substr(0, size) + '.'
        }
      }

      // in game
      array.usersInGame = Array()
      for (let i = 0; i < usersInGame.length; i++) {
        array.usersInGame.push(usersInGame[i])
        const length = array.usersInGame[i].anagram.length + array.usersInGame[i].nickname.length
        if (length > 17) {
          const size = 16 - array.usersInGame[i].anagram.length
          array.usersInGame[i].nickname = array.usersInGame[i].nickname.substr(0, size) + '.'
        }
      }

      // offline
      array.usersOffline = Array()
      for (let i = 0; i < usersOffline.length; i++) {
        array.usersOffline.push(JSON.parse(JSON.stringify(usersOffline[i])))
        if (array.usersOffline[i].anagram !== undefined) {
          const length = array.usersOffline[i].anagram.length + array.usersOffline[i].nickname.length
          if (length > 17) {
            const size = 16 - array.usersOffline[i].anagram.length
            array.usersOffline[i].nickname = array.usersOffline[i].nickname.substr(0, size) + '.'
          }
        }
      }
    }

    this.context = array
    const templateDataChat = this.templateChat(this.context)
    this.$el.html(templateDataChat)

    if (this.myChannels.length === 0) {
      document.getElementById('right-side').style.display = 'none'
      document.getElementById('center').style.display = 'none'
    }
    if (this.myChannels.length > 0) {
      const currentChannel = this.myChannels.at(0)
      const id = currentChannel.get('id')
      if (currentChannel.get('privacy') === 'direct_message') {
        document.getElementById('right-side').style.display = 'none'
        document.getElementById('pastille').classList.add(userChat.get('status'))
        document.getElementById('DM' + id).classList.add('open')
      } else {
        document.getElementById('right-side').style.display = 'flex'
        document.getElementById('channel' + id).classList.add('open')
      }
    }
    return this
  },

  openChat: function (e) {
    console.log('openChat')
    const divId = e.currentTarget.getAttribute('id')
    console.log(divId)
    const id = e.currentTarget.getAttribute('for')
    this.closeOpenDiscussion()
    document.getElementById(divId).classList.add('open')
    const currentChannel = this.myChannels.get(id)
    if (currentChannel.get('privacy') === 'direct_message') {
      document.getElementById('right-side').style.display = 'none'
    } else {
      document.getElementById('right-side').style.display = 'flex'
    }
    document.getElementById('center').style.display = 'flex'
    let status
    if (currentChannel.get('privacy') === 'direct_message') {
      const id = currentChannel.get('participant_ids').find(el => el !== this.userLogged.get('id'))
      const user = this.users.get(id)
      this.context.channel = false
      this.context.image_url = user.get('image_url')
      this.context.anagram = user.get('anagram')
      this.context.nickname = user.get('nickname')
      status = user.get('status')
      this.context.status = status
      if (status === 'ingame') {
        this.context.slide_show = './icons/slideshow-ingame.svg'
      } else {
        this.context.slide_show = './icons/slideshow.svg'
      }
    } else {
      this.context.privacy = currentChannel.get('privacy')[0].toUpperCase() + currentChannel.get('privacy').slice(1)
      this.context.channel = true
      this.context.name = currentChannel.get('name')
    }
    this.updateHTML('center')
    this.updateHTML('right-side')
    const el = document.getElementById('pastille')
    el.classList.remove('offline')
    el.classList.add(status)
  },

  selectCheckbox: function (e) {
    console.log('selectCheckbox')
    const id = e.currentTarget.getAttribute('for')
    const checkbox = document.getElementById(id)
    if (checkbox.checked === true) { checkbox.checked = false } else { checkbox.checked = true }
  },

  openModalCreateChannel: function () {
    console.log('openModalCreateChannel')
    this.context.friends = JSON.parse(JSON.stringify(this.users))
    this.updateHTML('modalCreateChannel')
    document.getElementById('modalCreateChannel').style.display = 'flex'
  },

  modalClose: function () {
    console.log('modalClose')
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

  createChannel: function (e) {
    console.log('createChannel')
    const checkboxes = document.getElementsByClassName('checkbox')
    const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked === true)
    const participantsIds = Array.from(selectedCboxes, x => x.value)
    const name = document.getElementById('channelName').value
    const newChannel = new ChatModel()
    const createChannel = async () => {
      try {
        const response = await newChannel.createChannel(name, participantsIds)
        this.myChannels.add(newChannel)
        this.channels.add(newChannel)
        this.modalClose()
        const myChannels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
        this.context.myChannels.push(JSON.parse(JSON.stringify(newChannel)))
        this.context.myChannels[this.context.myChannels.length - 1].admin = true
        this.updateHTML('myChannels')
        this.closeOpenDiscussion()
        document.getElementById('channel' + newChannel.get('id')).classList.add('open')
        e.currentTarget = document.getElementById('channel' + newChannel.get('id'))
        this.openChat(e)
      } catch (error) {
        document.getElementById('error-message').innerHTML = error.responseJSON.message
        document.getElementById('error-message').style.display = 'block'
      }
    }
    createChannel()
  },

  sendMessage: function (e) {
    console.log('sendMessage')
    if (e.keyCode === 13) { console.log('send message') } else { console.log('not enter') }
  },

  updateHTML: function (div) {
    console.log('updateHTML')
    const html = this.templateChat(this.context)
    const found = $(html).find('#' + div)[0].innerHTML
    const currentDiv = document.getElementById(div)
    currentDiv.innerHTML = found
  },

  modalSearchFriends: function (e) {
    console.log('modalSearchFriends')
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const search = this.users.slice().filter(function (el) {
      if (el.get('nickname').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      if (el.get('anagram') !== undefined && el.get('anagram').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    })
    const find = 'friends' + e.currentTarget.getAttribute('id')
    this.context.friends = JSON.parse(JSON.stringify(search))
    this.updateHTML(find)
  },

  inputModalSearchAllChannels: function (e) {
    console.log('inputModalSearchAllChannels')
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const search = this.channels.slice().filter(function (el) {
      if ((el.get('privacy') === 'public' || el.get('privacy') === 'protected') &&
      el.get('name').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    })
    this.context.channels = JSON.parse(JSON.stringify(search))
    this.updateHTML('searchAllChannel')
  },

  openModalCreateDM: function () {
    console.log('openModalCreateDM')
    this.context.friends = JSON.parse(JSON.stringify(this.users))
    this.updateHTML('modalCreateDirectMessages')
    document.getElementById('modalCreateDirectMessages').style.display = 'flex'
  },

  closeOpenDiscussion: function () {
    console.log('closeOpenDiscussion')
    Array.prototype.forEach.call(document.getElementsByClassName('open'),
      function (el) {
        el.classList.remove('open')
      })
  },

  createDM: function (e) {
    console.log('createDM')
    const id = e.currentTarget.getAttribute('for')
    const DM = this.myChannels.slice().filter(el => el.get('privacy') === 'direct_message')
    let i = 0
    for (; i < DM.length; i++) {
      if (DM[i].get('participant_ids').find(function (el) {
        if (el == id) { return true }
        return false
      })) {
        this.modalClose()
        this.closeOpenDiscussion()
        document.getElementById('DM' + DM[i].get('id')).classList.add('open')
        e.currentTarget = document.getElementById('DM' + DM[i].get('id'))
        this.openChat(e)
        break
      }
    }
    if (i === DM.length) {
      const newChannel = new ChatModel()
      const participantsIds = new Array()
      participantsIds.push(id)
      const createChannel = async () => {
        try {
          const response = await newChannel.createChannel(undefined, participantsIds, 'direct_message')
          this.myChannels.add(newChannel)
          this.context.DM.push(JSON.parse(JSON.stringify(newChannel)))
          this.context.DM[this.context.DM.length - 1].image_url = this.users.get(id).get('image_url')
          this.context.DM[this.context.DM.length - 1].anagram = this.users.get(id).get('anagram')
          this.context.DM[this.context.DM.length - 1].nickname = this.users.get(id).get('nickname')
          this.updateHTML('DM')
          this.modalClose()
          this.closeOpenDiscussion()
          document.getElementById('DM' + newChannel.get('id')).classList.add('open')
          e.currentTarget = document.getElementById('DM' + newChannel.get('id'))
          this.openChat(e)
        } catch (error) {
          this.modalClose()
        }
      }
      createChannel()
    }
  },

  deleteChannel: function (e) {
    console.log('deleteChannel')
    const id = document.getElementById('modalValidationDeleteChannel').getAttribute('for')
    this.myChannels.get(id).leaveRoom()
    this.myChannels.remove(id)
    const myChannels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
    const array = Array()
    for (let i = 0; i < myChannels.length; i++) {
      array.push(JSON.parse(JSON.stringify(myChannels[i])))
      array[i].admin = myChannels[i].get('admin_ids').find(el => el === this.userLogged.get('id'))
    }
    this.context.myChannels = JSON.parse(JSON.stringify(array))
    this.updateHTML('myChannels')
    document.getElementById('modalValidationDeleteChannel').style.display = 'none'
    document.getElementById('modalValidationDeleteChannel').setAttribute('for', '')
    if (this.myChannels.length > 0) {
      e.currentTarget = document.getElementsByClassName('clickable-discussions')[0]
      this.openChat(e)
    } else {
      document.getElementById('center').style.display = 'none'
      document.getElementById('right-side').style.display = 'none'
    }
  },

  deleteChannelConfirmation: function (e) {
    console.log('deleteChannelConfirmation')
    e.stopPropagation()
    const id = e.currentTarget.getAttribute('for')
    if (this.myChannels.get(id).get('privacy') !== 'direct_message') {
      if (this.myChannels.get(id).get('admin_ids').find(el => el === this.userLogged.get('id'))) {
        document.getElementById('modalValidationDeleteChannel').style.display = 'flex'
        document.getElementById('modalValidationDeleteChannel').setAttribute('for', id)
      } else {
        this.myChannels.get(id).leaveRoom()
        this.myChannels.remove(id)
        const myChannels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
        this.context.myChannels = JSON.parse(JSON.stringify(myChannels))
        this.updateHTML('myChannels')
        if (this.myChannels.length > 0) {
          e.currentTarget = document.getElementsByClassName('clickable-discussions')[0]
          this.openChat(e)
        } else {
          document.getElementById('center').style.display = 'none'
          document.getElementById('right-side').style.display = 'none'
        }
      }
    }
  },

  openModalSearchChannel: function () {
    console.log('openModalSearchChannel')
    const channels = this.channels.slice().filter(function (el) {
      if (el.get('privacy') === 'public' || el.get('privacy') === 'protected') {
        return true
      }
      return false
    })
    this.context.channels = JSON.parse(JSON.stringify(channels))
    this.updateHTML('searchAllChannel')
    document.getElementById('modalSearchAllChannels').style.display = 'flex'
  },

  subscribeChannel: function (e) {
    console.log('subscribeChannel')
    const id = e.currentTarget.getAttribute('for')
    const myChannels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
    let i = 0
    for (; i < myChannels.length; i++) {
      if (myChannels[i].get('id') == id) {
        break
      }
    }
    if (i === myChannels.length) {
      const channel = this.channels.get(id)
      channel.subscribeChannel()
      this.myChannels.add(channel)
      this.context.myChannels.push(JSON.parse(JSON.stringify(channel)))
      this.updateHTML('myChannels')
    }
    this.modalClose()
    this.closeOpenDiscussion()
    document.getElementById('channel' + id).classList.add('open')
    e.currentTarget = document.getElementById('channel' + id)
    this.openChat(e)
  }
})
