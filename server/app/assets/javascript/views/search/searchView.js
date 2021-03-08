export const SearchView = Backbone.View.extend({
  initialize: function () {
    this.template = Handlebars.templates.search
    this.item = this.model.get('item')
    this.guilds = this.model.get('guilds').get('obj')
    this.users = this.model.get('users').get('obj')
    this.listenTo(this.guilds, 'sync', function () { this.getUsers() }, this)
    // console.log('test: ' + this.model.get('userLoggedId'))
  },

  getUsers: function () {
    this.listenTo(this.users, 'sync', function () { this.render() }, this)
  },

  el: $('#app'),
  render: function () {
    const result = []
    console.log(this.item)

    if (this.item === undefined) { this.$el.html('searcbar') } else {
      for (let i = 1; i <= this.guilds.length; i++) {
        if (this.guilds.get(i).get('name').toLowerCase().search(this.item.toLowerCase()) !== -1 ||
            this.guilds.get(i).get('anagram').toLowerCase().search(this.item.toLowerCase()) !== -1) {
          result.push({
            type: 'guild',
            name: this.guilds.get(i).get('name'),
            anagram: this.guilds.get(i).get('anagram'),
            id: this.guilds.get(i).get('id')
          })
        }
      }

      for (let i = 1; i <= this.users.length; i++) {
        if (this.users.get(i).get('nickname').toLowerCase().search(this.item.toLowerCase()) !== -1) {
          result.push({
            type: undefined,
            name: this.users.get(i).get('nickname'),
            id: this.users.get(i).get('id')
          })
        }
      }
    }

    const context = {
      result: result,
      item: this.item
    }
    console.log(result)
    this.$el.html(this.template(context))
    return this
  }
})
