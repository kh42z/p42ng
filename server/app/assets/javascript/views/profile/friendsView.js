export const FriendsView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    console.log('Friends view')
    this.$el.html('Friends')
    return this
  }
})
