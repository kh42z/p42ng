const HomeView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.templateTopNav = Handlebars.templates.topnav
    this.templateHome = Handlebars.templates.home
    this.render()
  },
  render: function () {
    const context = {
      user: 'pganglof',
    }

    const templateDataTopNav = this.templateTopNav(context)
    const templateDataHome = this.templateHome(context)
    this.$el.html(templateDataTopNav + templateDataHome)
  }
})
export const homeView = new HomeView()
