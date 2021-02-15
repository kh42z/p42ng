export const OauthView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    this.templateOauth = Handlebars.templates.oauth
    const context = {}
    const templateDataOauth = this.templateOauth(context)
    this.$el.html(templateDataOauth)
    return this
  }
})
