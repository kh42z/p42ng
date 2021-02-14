export const OauthView = Backbone.View.extend({
  events: {
    'click .signIn': 'signin'
  },
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    console.log('oauth view')
    this.templateOauth = Handlebars.templates.oauth
    const context = {}
    const templateDataOauth = this.templateOauth(context)
    this.$el.html(templateDataOauth)
    return this
  },
  signin: function () {
    console.log('event signin')
    // this.model.getOauth()
  }
})
