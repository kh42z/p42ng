export const EditProfileView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    console.log('edit profile view')
    this.$el.html('EditProfile')
    return this
  }
})
