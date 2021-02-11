export const HeaderView = Backbone.View.extend({
  initialize: function () {
    this.templateTopNav = Handlebars.templates.topnav
  },
  el: $('#header'),
  render: function () {
    const context = {
      user: 'pganglof',
      profile_pic: '../../images/profile-pic.jpg'
    }

    const templateDataTopNav = this.templateTopNav(context)
    this.$el.html(templateDataTopNav)
    return this
  }
})
