export const FriendsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.render()
  },
  render: function () {
		console.log("Friends view")
    this.$el.html('Friends')
  }
})
