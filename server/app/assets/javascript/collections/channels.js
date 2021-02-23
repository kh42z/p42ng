import { ChatModel } from '../models/chatModel'

export const Channels = Backbone.Collection.extend({
  initialize: function () {

  },
  model: ChatModel,
  urlRoot: 'api/chats/',
  url: function () {
    return this.urlRoot
  }
})
