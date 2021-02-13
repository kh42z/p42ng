export const HomeView = Backbone.View.extend({
  initialize: function () {
    this.templateHome = Handlebars.templates.home
  },
  el: $('#app'),
  render: function () {
    const context = {
      user: 'pganglof',
      profile_pic: '../../images/profile-pic.jpg'
    }
    const templateDataHome = this.templateHome(context)
    this.$el.html(templateDataHome)
    return this
  }
})
