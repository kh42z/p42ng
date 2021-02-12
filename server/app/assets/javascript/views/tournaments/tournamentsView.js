export const TournamentsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.render()
  },
  render: function () {
    this.$el.html('Tournaments')
  }
})
