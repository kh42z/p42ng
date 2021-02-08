const HomeView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    const templateTopNav = Handlebars.templates.topnav
    const templateHome = Handlebars.templates.home

    const context = {
      user: 'pganglof',
    }

    const templateDataHome = templateHome(context)
    const templateDataTopNav = templateTopNav(context)
    this.$el.html(templateDataTopNav + templateDataHome)
  }
})
export const homeView = new HomeView()
