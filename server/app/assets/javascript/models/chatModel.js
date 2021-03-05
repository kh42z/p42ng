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
    const headers = this.superHeaders.getHeaders()

    const url = '/api/chats/' + this.id + '/participants'
    fetch(url, {
      method: 'DELETE',
      headers: headers
    })
  },
  subscribeChannel: function () {
    const headers = this.superHeaders.getHeaders()
    const url = '/api/chats/' + this.id + '/participants'
    fetch(url, {
      method: 'POST',
      headers: headers
    })
  }
})
