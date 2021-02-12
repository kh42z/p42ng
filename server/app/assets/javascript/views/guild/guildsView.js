export const GuildsView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
			console.log("bonjour")
			this.listenTo(this.collection, 'sync', function () {
			this.render()}, this)
		},

  render: function () {
		let row = Array.of(this.collection.length);
		console.log("guild view j'ai fini")
		console.log(JSON.stringify(this.collection.get("1")))


		for (let i = 1; i <= this.collection.length; i++)
		{
			console.log(i)
			//console.log(JSON.stringify(this.collection.get(i)))
	//		row[i - 1].name = this.collection.get(i).get("name")
			//row[i - 1].score = this.collection.get(i).get("score")
		row.push(JSON.parse(JSON.stringify(this.collection.get(i))))
		//console.log(row[i - 1])
		}

		let context = {row: row}

		this.templateGuilds = Handlebars.templates.guilds
		const templateData = this.templateGuilds(context)
	//	let guild1 = this.collection.get(0)
	//	console.log(guild1.name)
    this.$el.html(templateData)
  }
})
