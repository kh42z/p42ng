export const LeaderboardView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
    this.$el.html('Achivements')
  }
})

// A list of users ordered by rank
