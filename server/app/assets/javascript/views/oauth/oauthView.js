export const OauthView = Backbone.View.extend({
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
  }
})
