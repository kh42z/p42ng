
export const PongView = Backbone.View.extend({
  initialize: function () {
    this.template = Handlebars.templates.pong
    this.render()
  },
  el: $('#app'),
  render: function () {
    // console.log('pong page')
    this.$el.html(this.template({}))
    return this
  }
})
