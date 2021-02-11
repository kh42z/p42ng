const HomeView = Backbone.View.extend({
  initialize: function () {
    // this.templateTopNav = Handlebars.templates.topnav
    this.templateHome = Handlebars.templates.home
    // this.render()
  },
  el: $('#app'),
  render: function () {
    const context = {
      user: 'pganglof',
      profile_pic: '../../images/profile-pic.jpg'
    }

    // const templateDataTopNav = this.templateTopNav(context)
    const templateDataHome = this.templateHome(context)
    this.$el.html(templateDataHome)
    // this.$el.html(templateDataTopNav + templateDataHome)
    return this
  }
})
export const homeView = new HomeView()
