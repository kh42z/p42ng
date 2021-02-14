export const HeaderView = Backbone.View.extend({
  initialize: function () {
    this.templateTopNav = Handlebars.templates.topnav
    this.listenTo(this.model, 'sync', function () {
      this.render()
    }, this)

    this.listenTo(this.model, 'change', function () {
      this.render()
    }, this)
  },
  el: $('#header'),
  render: function () {
    const context = {
      user: this.model.get('nickname'),
      profile_pic: '../../images/profile-pic.jpg'
    }
    const templateDataTopNav = this.templateTopNav(context)
    this.$el.html(templateDataTopNav)
    return this
  }
})
