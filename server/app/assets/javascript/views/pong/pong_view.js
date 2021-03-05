
export const PongView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.template = Handlebars.templates.pong
    this.render()
  },
  render: function () {
    // console.log('pong page')
    this.$el.html(this.template({}))
    return this
  }
})
