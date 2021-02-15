export const fistConnexionView = Backbone.View.extend({
  events: {
  },
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    this.template = Handlebars.templates.firstConnexion
    const context = {}
    const templateDataOauth = this.template(context)
    this.$el.html(templateDataOauth)
    return this
  },
  signin: function () {
    console.log('event signin')
    // this.model.getOauth()
  }
})
