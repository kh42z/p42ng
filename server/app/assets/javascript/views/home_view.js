export const HomeView = Backbone.View.extend({
  initialize: function () {
    this.templateHome = Handlebars.templates.home
  },
  el: $('#app'),
  render: function () {
    const context = {
    }
    const templateDataHome = this.templateHome(context)
    this.$el.html(templateDataHome)
    return this
  }
})
