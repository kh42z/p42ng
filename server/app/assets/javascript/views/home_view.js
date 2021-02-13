export const HomeView = Backbone.View.extend({
  initialize: function () {
    this.templateHome = Handlebars.templates.home
    console.log(window.location)

    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('auth_token'))
    console.log(urlParams.get('uid'))
    console.log(urlParams.get('client_id'))
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
