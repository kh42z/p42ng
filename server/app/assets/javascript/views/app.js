// eslint-disable-next-line no-undef
const AppView = Backbone.View.extend({
  // eslint-disable-next-line no-undef
  el: $('#app'),
  initialize: function () {
  },
  render: function () {
  // eslint-disable-next-line no-undef
    const template = Handlebars.templates.navbar
    const context = {
      welcome: 'Home page'
    }

    const templateData = template(context)
    this.$el.html(templateData)
  }
})
export const appView = new AppView()
