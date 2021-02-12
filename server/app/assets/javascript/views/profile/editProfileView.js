export const EditProfileView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("edit profile view")
    this.$el.html('EditProfile')
  }
})
