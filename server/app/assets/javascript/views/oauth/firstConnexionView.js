export const FirstConnexionView = Backbone.View.extend({
  events: {
    'click .validate': 'change_nickname'
  },

  initialize: function () {
    this.render()
  },

  el: $('#app'),

  render: function () {
    this.template = Handlebars.templates.firstConnexion
    const context = {}
    const templateData = this.template(context)
    this.$el.html(templateData)
    return this
  },

  change_nickname: function () {
    const saveNickname = async () => {
      await this.model.saveNickname(document.getElementById('nickname').value)
      this.model.saveFirstLogin(false)
    }
    saveNickname()
  }
})
