export const HeaderView = Backbone.View.extend({
  initialize: function () {
    this.templateTopNav = Handlebars.templates.topnav

    this.listenTo(this.model, 'change', function () {
      this.render()
    }, this)
  },
  el: $('#header'),
  render: function () {
    this.urlParams = new URLSearchParams(window.location.search)
    const array = {}

    array[Backbone.history.getFragment()] = true
    array.active = 'active'
    array.user = this.model.get('nickname')
    array.profile_pic = this.model.get('image_url')
    const context = JSON.parse(JSON.stringify(array))
    const templateDataTopNav = this.templateTopNav(context)
    this.$el.html(templateDataTopNav)
    return this
  }
})
