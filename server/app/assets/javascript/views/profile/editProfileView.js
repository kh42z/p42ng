export const EditProfileView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.render()
  },
  render: function () {
		console.log("edit profile view")
    this.$el.html('EditProfile')
  }
})
