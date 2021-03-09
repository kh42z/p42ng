export const AdminView = Backbone.View.extend({
  events: {
    'click .banned': 'authorize'
  },
  initialize: function () {
    this.users = this.model.get('users').get('obj')
    this.listenTo(this.users, 'sync', function () {
      this.render()
    }, this)
  },
  el: $('#app'),

  render: function (message = '') {
    const users = JSON.parse(JSON.stringify(this.users))
    this.templateAdmin = Handlebars.templates.admin
    this.$el.html(this.templateAdmin({ users: users }))
    return this
  },
  authorize: function (event) {
    const userId = event.currentTarget.getAttribute('for')
    const user = this.users.get(userId)
    console.log('User: ' + userId)
    user.updateBanned(event.currentTarget.checked)
  }
})
