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
    'click .yesDeleteChannel': 'deleteChannel',
    'click .no': 'modalClose',
    'click .clickable-discussions': 'openChat',
    'click .group_add-container': 'openModalAddFriendsToChannel',
    'click .validate-add-friends': 'validateAddFriendsToChannel',
    'click .admin_panel_settings': 'adminPanelOverviewMenu',
    'click .overview-menu': 'adminPanelOverviewMenu',
    'click .permissions-menu': 'adminPanelPermissionsMenu',
    'click .members-menu': 'adminPanelMembersMenu',
    'click .closeParams': 'closeParams',
    'keyup .modalSearchAddFriendsToChannel': 'modalSearchAddFriends',
    'click .dots-container': 'adminRights',
    'click .deleteChannel': 'deleteDefinitivelyChannel',
    'click .yesDeleteDefinitivelyChannel': 'yesDeleteDefinitivelyChannel',
    'click .appoint-as-admin': 'modalValidationAppointAsAdmin',
    'click .members': 'closeAdminRights',
    'click .yesAsAdmin': 'yesAsAdmin',
    'click .ban': 'openModalBan',
    'click .yesBan': 'validateBan',
    'click .mute': 'openModalMute',
    'click .yesMute': 'validateMute',
    'click .passwordVisibility': 'passwordVisibility',
    'click .private': 'radioPrivate',
    'click .public': 'radioPublic',
    'click .protected': 'radioProtected',
    'click .save': 'savePrivacy'
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
    users: undefined,
    channelId: undefined
  },
  el: $('#app'),
  render: function () {
    this.templateChat = Handlebars.templates.chat
    this.context = {}

    // my channels
    const channels = this.myChannels.slice().filter(el => el.get('privacy') !== 'direct_message')
    this.context.myChannels = Array()
    for (let i = 0; i < channels.length; i++) {
      this.context.myChannels.push(JSON.parse(JSON.stringify(channels[i])))
      this.context.myChannels[i].admin = channels[i].get('admin_ids').find(el => el === this.userLogged.get('id'))
    }

    // direct messages
    const DM = this.myChannels.slice().filter(el => el.get('privacy') === 'direct_message')
    this.context.DM = Array()
    for (let i = 0; i < DM.length; i++) {
      this.context.DM.push(JSON.parse(JSON.stringify(DM[i])))
      const id = DM[i].get('participant_ids').find(el => el !== this.userLogged.get('id'))
      this.context.DM[i].image_url = this.users.get(id).get('image_url')
      this.context.DM[i].anagram = this.users.get(id).get('anagram')
      this.context.DM[i].nickname = this.users.get(id).get('nickname')
    }

    // header center
    if (this.myChannels.length > 0) {
      const currentChannel = this.myChannels.at(0)
      this.updateContextCenter(currentChannel)

      // history messages
      this.context.messages = Array()
      for (let i = 0; i < 0; i++) {
        this.context.messages.push({
          anagram: '[24.c]',
          image_url: './images/profile-pic.jpg',
          nickname: 'pganglof-with-very-long-name',
          time: i,
          message: 'ptite game?'
        })
      }

      // right side
      this.updateContextRightSide(currentChannel)
    }

    const templateDataChat = this.templateChat(this.context)
    this.$el.html(templateDataChat)

    // update post render
    this.updateDOM(this.myChannels.at(0))
    return this
  },

  passwordVisibility: function () {
    console.log('password visibility')
    const icon = document.getElementById('eyeVisibility')
    const password = document.getElementById('password')
    if (icon.src.includes('icons/visibility.svg')) {
      icon.src = './icons/visibility_off.svg'
      password.type = 'password'
    } else {
      icon.src = './icons/visibility.svg'
      password.type = 'text'
    }
  },

  validateMute: function (e) {
    const userId = e.currentTarget.getAttribute('for')
    const radio = document.getElementsByName('radioMute' + userId)
    const getValue = function () {
      let i = 0
      for (; i < radio.length; i++) {
        if (radio[i].checked === true) { break }
      }
      return radio[i].value
    }
    const value = getValue()
    const currentChannel = this.myChannels.get(this.channelId)
    currentChannel.muteUser(Number(value), Number(userId))
    this.modalClose()
  },

  openModalMute: function (e) {
    console.log('open modal mute')
    document.getElementById('modalValidationMute' + e.currentTarget.getAttribute('for')).style.display = 'flex'
  },

  validateBan: function (e) {
    const userId = e.currentTarget.getAttribute('for')
    const radio = document.getElementsByName('radioBan' + userId)
    const getValue = function () {
      let i = 0
      for (; i < radio.length; i++) {
        if (radio[i].checked === true) { break }
      }
      return radio[i].value
    }
    const value = getValue()
    const currentChannel = this.myChannels.get(this.channelId)
    currentChannel.banUser(Number(value), Number(userId))
    this.modalClose()
  },

  openModalBan: function (e) {
    console.log('open modal ban')
    document.getElementById('modalValidationBan' + e.currentTarget.getAttribute('for')).style.display = 'flex'
  },

  yesAsAdmin: function (e) {
    const userId = e.currentTarget.getAttribute('for')
    const currentChannel = this.myChannels.get(this.channelId)
    const adminIds = currentChannel.get('admin_ids')
    adminIds.push(Number(userId))
    console.log(adminIds)
    const array = Array()
    array.push(Number(userId))
    console.log(Array(Number(userId)))
    currentChannel.patchAdmin(array)
    currentChannel.set({ admin_ids: adminIds })
    this.modalClose()
    this.updateContextAdmin(currentChannel)
    this.updateContextMembers(currentChannel)
    this.updateHTML('admins')
    this.updateHTML('participants')
  },

  modalValidationAppointAsAdmin: function (e) {
    e.stopPropagation()
    document.getElementById('modalValidationAppointAsAdmin' + e.currentTarget.getAttribute('for')).style.display = 'flex'
  },

  closeAdminRights: function (e) {
    console.log('closeAdminRights')
    e.stopPropagation()
    if (e.currentTarget.classList.contains('admin-rights') === false) {
      const adminRights = document.getElementsByClassName('admin-rights')
      console.log(adminRights.length)
      for (let i = 0; i < adminRights.length; i++) {
        adminRights[i].style.display = 'none'
      }
      const dotsContainer = document.getElementsByClassName('dots-container')
      for (let i = 0; i < dotsContainer.length; i++) {
        dotsContainer[i].classList.remove('open')
      }
    }
  },

  adminRights: function (e) {
    console.log('adminRights')
    e.stopPropagation()
    const id = e.currentTarget.getAttribute('for')
    if (e.currentTarget.classList.contains('open')) {
      document.getElementById('admin-rights' + id).style.display = 'none'
      e.currentTarget.classList.remove('open')
    } else {
      e.currentTarget.classList.add('open')
      document.getElementById('admin-rights' + id).style.display = 'flex'
    }
  },

  updateContextAdmin: function (currentChannel) {
    const admins = currentChannel.get('admin_ids')
    this.context.admins = Array()
    for (let i = 0; i < admins.length; i++) {
      if (admins[i] !== currentChannel.get('owner_id')) {
        let admin = this.users.get(admins[i])
        if (admin === undefined) {
          admin = this.userLogged
        }
        console.log(admin)
        let anagram
        if (admin.get('anagram') === undefined) {
          anagram = 'N/A'
        } else {
          anagram = admin.get('anagram')
        }
        this.context.admins.push(JSON.parse(JSON.stringify(admin)))
        this.context.admins[this.context.admins.length - 1].anagram = anagram
      }
    }
  },

  updateContextMembers: function (currentChannel) {
    const members = currentChannel.get('participant_ids')
    const admins = currentChannel.get('admin_ids')
    const ownerId = currentChannel.get('owner_id')
    let owner
    if (ownerId === this.userLogged.get('id')) {
      owner = this.userLogged
    } else {
      owner = this.users.get(
        currentChannel.get('owner_id')
      )
    }
    this.context.members = Array()
    for (let i = 0; i < members.length; i++) {
      if (members[i] !== this.userLogged.get('id') &&
        !admins.find(el => el === members[i])) {
        const member = this.users.get(members[i])
        let anagram
        if (owner.get('anagram') === undefined) {
          anagram = 'N/A'
        } else {
          anagram = owner.get('anagram')
        }
        this.context.members.push(JSON.parse(JSON.stringify(member)))
        this.context.members[this.context.members.length - 1].anagram = anagram
        this.context.members[this.context.members.length - 1].owner = this.context.owner
      }
    }
  },

  adminPanelMembersMenu: function () {
    const currentChannel = this.myChannels.get(this.channelId)
    const ownerId = currentChannel.get('owner_id')
    let owner
    if (ownerId === this.userLogged.get('id')) {
      owner = this.userLogged
    } else {
      owner = this.users.get(
        currentChannel.get('owner_id')
      )
    }
    this.context.owners = Array()
    let anagram
    if (owner.get('anagram') === undefined) {
      anagram = 'N/A'
    } else {
      anagram = owner.get('anagram')
    }
    this.context.owners.push(JSON.parse(JSON.stringify(owner)))
    this.context.owners[this.context.owners.length - 1].anagram = anagram

    this.updateContextAdmin(currentChannel)
    this.updateContextMembers(currentChannel)

    this.updateHTML('params-members')
    document.getElementById('params-overview').style.display = 'none'
    document.getElementById('params-permissions').style.display = 'none'
    document.getElementById('params-members').style.display = 'flex'

    document.getElementById('overview-menu').classList.remove('open')
    document.getElementById('members-menu').classList.add('open')
    document.getElementById('permissions-menu').classList.remove('open')
  },

  closeParams: function () {
    document.getElementById('params').style.display = 'none'
    document.getElementById('passwordDiv').style.display = 'none'
    document.getElementById('password').value = ''
    document.getElementById('discussions').style.display = 'flex'
    document.getElementById('center').style.display = 'flex'
    document.getElementById('right-side').style.display = 'flex'
    this.channelId = undefined
  },

  savePrivacy: function () {
    // const radios = document.getElementByName('privacy')
    const privacy = document.querySelector('input[name="privacy"]:checked').value
    const password = document.getElementById('password').value
    console.log(password)
    const currentChannel = this.myChannels.get(this.channelId)
    console.log(privacy, password)

    console.log(currentChannel)
    console.log(currentChannel.get('password'))
    const updatePrivacy = async () => {
      try {
        const response = await currentChannel.updatePrivacy(privacy, password)
      } catch (error) {
        document.getElementById('error-password').innerHTML = error.responseJSON.message
        document.getElementById('error-password').style.display = 'block'
      }
    }
    updatePrivacy()
  },

  radioPublic: function () {
    document.getElementById('passwordDiv').style.display = 'none'
  },

  radioPrivate: function () {
    document.getElementById('passwordDiv').style.display = 'none'
  },

  radioProtected: function () {
    console.log('radio protected')
    document.getElementById('passwordDiv').style.display = 'flex'
  },

  adminPanelPermissionsMenu: function () {
    const currentChannel = this.myChannels.get(this.channelId)
    const privacy = currentChannel.get('privacy')
    const radio = document.getElementById(privacy)
    radio.checked = true

    if (privacy === 'protected') {
      document.getElementById('passwordDiv').style.display = 'flex'
    }

    document.getElementById('params-overview').style.display = 'none'
    document.getElementById('params-members').style.display = 'none'
    document.getElementById('params-permissions').style.display = 'flex'
    document.getElementById('overview-menu').classList.remove('open')
    document.getElementById('members-menu').classList.remove('open')
    document.getElementById('permissions-menu').classList.add('open')
  },

  adminPanelOverviewMenu: function (e) {
    e.stopPropagation()
    if (this.channelId === undefined) {
      this.channelId = e.currentTarget.getAttribute('for')
      e.currentTarget = e.currentTarget.parentElement
      this.openChat(e)
    }

    this.context.name = this.myChannels.get(this.channelId).get('name')
    this.updateHTML('params-overview')

    document.getElementById('discussions').style.display = 'none'
    document.getElementById('center').style.display = 'none'
    document.getElementById('right-side').style.display = 'none'
    document.getElementById('params').style.display = 'flex'

    document.getElementById('params-overview').style.display = 'flex'
    document.getElementById('params-permissions').style.display = 'none'
    document.getElementById('params-members').style.display = 'none'

    document.getElementById('overview-menu').classList.add('open')
    document.getElementById('members-menu').classList.remove('open')
    document.getElementById('permissions-menu').classList.remove('open')
  },

  validateAddFriendsToChannel: function (e) {
    const channelId = e.currentTarget.getAttribute('for')
    const participantsIds = this.getSelectedBoxes()
    const currentChannel = this.myChannels.get(channelId)
    currentChannel.invitesToChannel(participantsIds)
    const participants = currentChannel.get('participant_ids')
    participantsIds.forEach(el => participants.push(Number(el)))
    currentChannel.set({ participants_ids: participants })
    this.myChannels.set(currentChannel)
    this.updateContextRightSide(currentChannel)
    this.updateHTML('right-side')
    this.modalClose()
  },

  openModalAddFriendsToChannel: function (e) {
    const channelId = e.currentTarget.getAttribute('for')
    const currentChannel = this.myChannels.get(channelId)
    const participantIds = currentChannel.get('participant_ids')
    const users = this.users.slice().filter(function (el) {
      for (let i = 0; i < participantIds.length; i++) {
        if (participantIds[i] === el.get('id')) {
          return false
        }
      }
      return true
    })
    this.context.friends = JSON.parse(JSON.stringify(users))
    this.updateHTML('modalAddFriendsToChannel')
    document.getElementById('modalAddFriendsToChannel').style.display = 'flex'
  },

  modalSearchAddFriends: function (e) {
    console.log('modalSearchAddFriends')
    const value = document.getElementById(e.currentTarget.getAttribute('id')).value
    const channelId = e.currentTarget.getAttribute('for')
    const currentChannel = this.myChannels.get(channelId)
    const participantIds = currentChannel.get('participant_ids')
    const search = this.users.slice().filter(function (el) {
      for (let i = 0; i < participantIds.length; i++) {
        if (participantIds[i] === el.get('id')) {
          return false
        }
      }
      if (el.get('nickname').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      if (el.get('anagram') !== undefined && el.get('anagram').toLowerCase().startsWith(value.toLowerCase()) === true) { return true }
      return false
    })
    const find = 'friends' + e.currentTarget.getAttribute('id')
    this.context.friends = JSON.parse(JSON.stringify(search))
    this.updateHTML(find)
  },

  updateDOM: function (currentChannel) {
    if (this.myChannels.length === 0) {
      document.getElementById('right-side').style.display = 'none'
      document.getElementById('center').style.display = 'none'
    }
    if (this.myChannels.length > 0) {
      let id = currentChannel.get('participant_ids').find(el => el !== this.userLogged.get('id'))
      const userChat = this.users.get(id)
      id = currentChannel.get('id')
      if (currentChannel.get('privacy') === 'direct_message') {
        document.getElementById('right-side').style.display = 'none'
        document.getElementById('pastille').classList.add(userChat.get('status'))
        document.getElementById('DM' + id).classList.add('open')
      } else {
        document.getElementById('right-side').style.display = 'flex'
        document.getElementById('channel' + id).classList.add('open')
      }
    }
  },

  updateContextRightSide: function (currentChannel) {
    console.log('updateContextRightSide')
    const usersOnline = this.users.slice().filter(function (el) {
      const id = el.get('id')
      if (currentChannel.get('participant_ids').find(el2 => el2 == id) &&
      el.get('status') === 'online') { return true }
      return false
    })
    const usersInGame = this.users.slice().filter(function (el) {
      const id = el.get('id')
      if (currentChannel.get('participant_ids').find(el2 => el2 == id) &&
      el.get('status') === 'ingame') { return true }
      return false
    })
    const usersOffline = this.users.slice().filter(function (el) {
      const id = el.get('id')
      if (currentChannel.get('participant_ids').find(el2 => el2 == id) &&
      el.get('status') === 'offline') { return true }
      return false
    })
    this.context.nbOnline = usersOnline.length
    this.context.nbOffline = usersOffline.length
    this.context.nbInGame = usersInGame.length
    this.context.usersOnline = Array()
    for (let i = 0; i < usersOnline.length; i++) {
      this.context.usersOnline.push(usersOnline[i])
      const length = this.context.usersOnline[i].anagram.length + this.context.usersOnline[i].nickname.length
      if (length > 17) {
        const size = 16 - this.context.usersOnline[i].anagram.length
        this.context.usersOnline[i].nickname = this.context.usersOnline[i].nickname.substr(0, size) + '.'
      }
    }

    // in game
    this.context.usersInGame = Array()
    for (let i = 0; i < usersInGame.length; i++) {
      this.context.usersInGame.push(usersInGame[i])
      const length = this.context.usersInGame[i].anagram.length + this.context.usersInGame[i].nickname.length
      if (length > 17) {
        const size = 16 - this.context.usersInGame[i].anagram.length
        this.context.usersInGame[i].nickname = this.context.usersInGame[i].nickname.substr(0, size) + '.'
      }
    }

    // offline
    this.context.usersOffline = Array()
    for (let i = 0; i < usersOffline.length; i++) {
      this.context.usersOffline.push(JSON.parse(JSON.stringify(usersOffline[i])))
      if (this.context.usersOffline[i].anagram !== undefined) {
        const length = this.context.usersOffline[i].anagram.length + this.context.usersOffline[i].nickname.length
        if (length > 17) {
          const size = 16 - this.context.usersOffline[i].anagram.length
          this.context.usersOffline[i].nickname = this.context.usersOffline[i].nickname.substr(0, size) + '.'
        }
      }
    }
  },

  updateContextCenter: function (currentChannel) {
    let status
    const idUserLogged = this.userLogged.get('id')
    if (currentChannel.get('privacy') === 'direct_message') {
      const id = currentChannel.get('participant_ids').find(el => el !== idUserLogged)
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
      this.context.owner = function () {
        return (currentChannel.get('owner_id') == idUserLogged)
      }
      this.context.chatId = currentChannel.get('id')
    }
    this.context.id = currentChannel.get('id')
  },

  openChat: function (e) {
    console.log('openChat')

    console.log(e)
    // display
    const divId = e.currentTarget.getAttribute('id')
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

    // center
    this.updateContextCenter(currentChannel)

    // right-side
    this.updateContextRightSide(currentChannel)

    // update HTML
    this.updateHTML('center')
    this.updateHTML('right-side')

    // update post render
    this.updateDOM(currentChannel)
  },

  selectCheckbox: function (e) {
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

  getSelectedBoxes: function () {
    const checkboxes = document.getElementsByClassName('checkbox')
    const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked === true)
    return Array.from(selectedCboxes, x => x.value)
  },

  createChannel: function (e) {
    console.log('createChannel')
    const participantsIds = this.getSelectedBoxes()
    const name = document.getElementById('channelName').value
    const newChannel = new ChatModel()
    const createChannel = async () => {
      try {
        const response = await newChannel.createChannel(name, participantsIds)
        console.log(this.myChannels)
        this.myChannels.add(newChannel)
        console.log(this.myChannels)
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
    console.log('updateHTML' + div)
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

  yesDeleteDefinitivelyChannel: function (e) {
    const currentChannel = this.myChannels.get(this.channelId)
    currentChannel.deleteDefinitivelyChannel()
    this.myChannels.remove(this.channelId)
    this.deleteChannelOfHTML(e)
    this.closeParams()
  },

  deleteDefinitivelyChannel: function () {
    document.getElementById('modalValidationDeleteDefinitivelyChannel').style.display = 'flex'
  },

  deleteChannelOfHTML: function (e) {
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

  deleteChannel: function (e) {
    console.log('deleteChannel')
    const id = document.getElementById('modalValidationDeleteChannel').getAttribute('for')
    this.myChannels.get(id).leaveRoom()
    this.myChannels.remove(id)
    this.deleteChannelOfHTML(e)
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
