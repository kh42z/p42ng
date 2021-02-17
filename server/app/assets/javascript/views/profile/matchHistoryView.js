export const MatchHistoryView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    console.log('match history wiew')
    this.$el.html('matchHistory')
    return this
  }
})
