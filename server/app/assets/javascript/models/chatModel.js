export const ChatModel = Backbone.Model.extend({
  defaults: {
    id: undefined,
    privacy: undefined,
    owner_id: undefined,
    admin_ids: undefined,
    participant_ids: undefined,
    timeout_ids: undefined,
    ban_ids: undefined
  },
  initialize: function () {
  },
  urlRoot: '/api/chats/',
  url: function () {
    if (this.id !== undefined) {
      return this.urlRoot + this.id
    }
    return this.urlRoot
  },
  createChannel: function (name, participantIds) {
    return this.save({
      name: name,
      participant_ids: participantIds,
      success: function (response) {
      },
      error: function (response) {
        console.log('error')
        console.log(response)
      }
    })
  }
})
