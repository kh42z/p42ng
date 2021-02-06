const HomeView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    const template = Handlebars.templates.topnav
    const context = {
      welcome: 'Home page',
      user: 'default'
    }

    const templateData = template(context)
    this.$el.html(templateData)
  }
})
export const homeView = new HomeView()
