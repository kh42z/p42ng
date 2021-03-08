export const TournamentsView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    this.$el.html('Tournaments')
    return this
  }
})
