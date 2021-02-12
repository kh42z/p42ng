export const GuildsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
		console.log("guild view")
	//	let guild1 = this.collection.get(0)
	/.	console.log(guild1.name)
    this.$el.html('Guilds list')
  }
})
