export const MembersView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    console.log('Members')
    this.$el.html('Guild members')
    return this
  }
})
