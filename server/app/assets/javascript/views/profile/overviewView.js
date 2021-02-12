export const ProfileOverviewView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
		this.render()
  },
  render: function () {
		console.log("overview")
    this.$el.html('Overview')
  }
})
