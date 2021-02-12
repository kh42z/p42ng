export const FriendsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("Friends view")
    this.$el.html('Friends')
  }
})
