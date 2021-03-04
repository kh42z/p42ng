import { ChatModel } from '../models/chatModel'

export const Channels = Backbone.Collection.extend({
  initialize: function () {
  },
  model: ChatModel,
  urlRoot: '/api/chats',
  url: function () {
    return this.urlRoot
  },
  fetchByUserId: function (id) {
    return this.fetch({
      url: this.urlRoot + '?participant_id=' + id,
      success: function (response) {
      },
      error: function (response) {
      }
    })
  },
  fetchAllChannels: function () {
    return this.fetch({
      success: function (response) {
      },
      error: function (response) {
      }
    })
  },
  createChannel: function (name, participantIds) {
    return this.create({
      name: name,
      participant_ids: participantIds,
      success: function (response) {
      },
      error: function (response) {
      }
    })
  }
})
