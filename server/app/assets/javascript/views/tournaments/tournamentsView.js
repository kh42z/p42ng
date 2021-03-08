export const TournamentsView = Backbone.View.extend({
  el: this.$('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    this.$el.html('Tournaments')
    return this
  }
})
