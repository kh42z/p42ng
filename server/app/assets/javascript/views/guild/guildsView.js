export const GuildsView = Backbone.View.extend({
  initialize: function () {
    this.guilds = this.model.get('guilds').get('obj')
    this.users = this.model.get('users').get('obj')
    // console.log('bonjour')
    this.listenTo(this.guilds, 'sync', function () {
      this.preload()
    }, this)
  },

  el: $('#app'),
  preload: function () {
    this.listenTo(this.users, 'sync', function () {
      this.render()
    }, this)
  },

  render: function () {
    const row = Array.of(this.guilds.length)

    for (let i = 1; i <= this.guilds.length; i++) {
      const guilds = JSON.parse(JSON.stringify(this.guilds.get(i)))

      guilds.owner_nickname = this.users.get(guilds.owner_id).get('nickname')
      guilds.officers = []

      for (let j = 0; j < this.guilds.get(i).get('officer_ids').length; j++) {
        guilds.officers.push({
          nickname: this.users.get(this.guilds.get(i).get('officer_ids')[j]).get('nickname'),
          id: this.users.get(this.guilds.get(i).get('officer_ids')[j]).get('id')
        })
      }
      row.push(guilds)
    }

    const context = { row: row }

    this.templateGuilds = Handlebars.templates.guilds
    const templateData = this.templateGuilds(context)
    //  let guild1 = this.collection.get(0)
    //  console.log(guild1.name)
    this.$el.html(templateData)
    return this
  }
})
