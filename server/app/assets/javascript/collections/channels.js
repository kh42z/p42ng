import { ChatModel } from '../models/chatModel'

export const Channels = Backbone.Collection.extend({
  initialize: function () {
  },
  model: ChatModel,
  urlRoot: 'api/chats',
  url: function () {
    return this.urlRoot
  },
  fetchByUserId: function (id) {
    this.fetch({
      url: this.urlRoot + '?participant_id=' + id,
      success: function (response) {
        console.log('success')
        console.log(response)
      },
      error: function (response) {
        console.log('error')
        console.log(response)
      }
    })
  },
  createChannel: function (adminIds, participantIds) {
    this.create({
      privacy: 'public',
      admin_ids: adminIds,
      participant_ids: participantIds
    })
  }
})
