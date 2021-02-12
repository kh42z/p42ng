export const CurrentWarView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("current war")
    this.$el.html('CurrentWarView')
  }
})
