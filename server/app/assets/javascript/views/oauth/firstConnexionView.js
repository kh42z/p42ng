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
    console.log('change nickname')
    this.model.saveNickname(document.getElementById('nickname').value)
    this.model.save({ first_login: false }, { patch: true },
      {
        success: function (response) {
          console.log('success')
          console.log(response)
        },
        error: function (response) {
          console.log('error')
          console.log(response)
        }
      })
  }
})
