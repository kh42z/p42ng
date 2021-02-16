export const HeaderView = Backbone.View.extend({
  events: {
    'click .btn': 'target_url'
  },
  initialize: function () {
    // this.listenTo(this.model, 'sync', function () {
    //   this.render()
    // }, this)
    // this.listenTo(this.model, 'change', function () {
    //   this.render()
    // }, this)
  },
  el: $('#header'),
  render: function (target) {
    console.log('render')
    this.templateTopNav = Handlebars.templates.topnav
    this.urlParams = new URLSearchParams(window.location.search)
    const array = {}

    if (target === undefined) { target = '#home' }
    array[target.substring(1)] = true
    array.active = 'active'
    array.user = this.model.get('nickname')
    array.profile_pic = this.model.get('image_url')
    const context = JSON.parse(JSON.stringify(array))
    const templateDataTopNav = this.templateTopNav(context)
    this.$el.html(templateDataTopNav)
    return this
  },

  target_url: function (e) {
    const target = $(e.currentTarget).attr('href')
    this.render(target)
  }
})
