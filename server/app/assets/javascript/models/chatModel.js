import { SuperHeaders } from '../services/headers'

export const ChatModel = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    privacy: undefined,
    owner_id: undefined,
    admin_ids: undefined,
    participant_ids: undefined,
    timeout_ids: undefined,
    ban_ids: undefined
  },
  initialize: function () {
    this.superHeaders = new SuperHeaders()
    this.headers = this.superHeaders.getHeaders()
  },
  urlRoot: '/api/chats/',
  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  },
  createChannel: function (name, participantIds, privacy = 'private') {
    return this.save({
      name: name,
      privacy: privacy,
      participant_ids: participantIds,
      success: function (response) {
      },
      error: function (response) {
        console.log('error')
        console.log(response)
      }
    })
  },
  createDM: function (participantIds, privacy = 'private') {
    return this.save({
      privacy: privacy,
      participant_ids: participantIds,
      success: function (response) {
      },
      error: function (response) {
        console.log('error')
        console.log(response)
      }
    })
  },
  leaveRoom: function () {
    const url = '/api/chats/' + this.id + '/participants'
    fetch(url, {
      method: 'DELETE',
      headers: this.headers
    })
  },
  subscribeChannel: function () {
    const url = '/api/chats/' + this.id + '/participants'
    fetch(url, {
      method: 'POST',
      headers: this.headers
    })
  },
  invitesToChannel: function (participantsIds) {
    const header = this.superHeaders.getHeaders()
    header.append('accept', 'application/json')
    header.append('Content-Type', 'application/json')
    const url = '/api/chats/' + this.id + '/invites'
    fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        participant_ids: participantsIds
      })
    })
  },
  deleteDefinitivelyChannel: function () {
    this.destroy()
  },
  patchAdmin: function (adminIds) {
    this.save({ admin_ids: adminIds }, { patch: true })
  },
  banUser: function (value, userId) {
    const header = this.superHeaders.getHeaders()
    console.log(header)
    header.append('accept', 'application/json')
    header.append('Content-Type', 'application/json')
    const url = '/api/chats/' + this.id + '/bans'
    fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        user_id: userId,
        duration: value
      })
    })
  },
  muteUser: function (value, userId) {
    const header = this.superHeaders.getHeaders()
    console.log(header)
    header.append('accept', 'application/json')
    header.append('Content-Type', 'application/json')
    const url = '/api/chats/' + this.id + '/mutes'
    fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        user_id: userId,
        duration: value
      })
    })
  }

})
