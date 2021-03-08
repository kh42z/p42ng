export const LeaderboardView = Backbone.View.extend({
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.template = Handlebars.templates.leaderboard
    this.listenTo(this.guilds, 'sync', function () {
      this.render()
    }, this)
  },
  el: $('#app'),
  render: function () {
    const row = []
    for (let i = 1; i <= this.guilds.length; i++) {
      // Trier guilde par score ici
      row.push(JSON.parse(JSON.stringify(this.guilds.get(i))))
    }

    // trier le tableau ici par score
    for (let i = 1; i <= row.length; i++) {
      // Trier guilde par score ici
      row[i - 1].position = i
    }
    const context = { row: row }
    console.log(row)
    this.$el.html(this.template(context))
    return this
  }
})

// A list of users ordered by rank
