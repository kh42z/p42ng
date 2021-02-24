import { ChatModel } from '../models/chatModel'

export const Channels = Backbone.Collection.extend({
  initialize: function () {
  },
  defaults: {
    participant_id: undefined
  },
  model: ChatModel,
  urlRoot: 'api/chats',
  url: function () {
    if (this.participant_id !== undefined) { return this.url + '?participant_id=' + this.participant_id }
    return this.urlRoot
  }
})
