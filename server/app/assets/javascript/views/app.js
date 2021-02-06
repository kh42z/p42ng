const AppView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
    const template = Handlebars.templates.navbar
    const context = {
      welcome: 'Home page'
    }

    const templateData = template(context)
    this.$el.html(templateData)
  }
})
export const appView = new AppView()
