// eslint-disable-next-line no-undef
const UsersView = Backbone.View.extend({
  // eslint-disable-next-line no-undef
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates.navbar

    const context = {
      welcome: 'Users! page'
    }

    const templateData = template(context)
    this.$el.html(templateData)
  }
})
export const usersView = new UsersView()
