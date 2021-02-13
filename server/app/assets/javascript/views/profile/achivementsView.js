export const AchivementsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    console.log('Achivements View')
    this.$el.html('Achivements')
    return this
  }
})
