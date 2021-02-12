export const LeaderboardView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.listenTo(this.collection, 'sync', function () {
		this.render()}, this)
  },
  render: function () {
    this.$el.html('Leaderboard')
  }
})

// A list of users ordered by rank
