export const CurrentWarView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    console.log('current war')
    this.$el.html('CurrentWarView')
    return this
  }
})
