export const MatchHistoryView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("match history wiew")
    this.$el.html('matchHistory')
  }
})
