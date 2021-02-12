export const MembersView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log('Members')
    this.$el.html('Guild members')
  }
})
