export const AchivementsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("Achivements View")
    this.$el.html('Achivements')
  }
})
