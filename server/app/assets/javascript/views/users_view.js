const UsersView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
    const template = Handlebars.templates.topnav

    const context = {
      welcome: 'Users! page',
      user: 'pganglof'
    }

    const templateData = template(context)
    this.$el.html(templateData)
  }
})
export const usersView = new UsersView()
