import { Router } from '../../router/router'

export const FirstConnexionView = Backbone.View.extend({
  events: {
    'click .validate': 'validate',
    'change input[type=file]': 'loadFile'
  },

  initialize: function () {
    this.render()
  },
  defaults: {
    fileObject: undefined
  },

  el: $('#app'),

  render: function (message = '') {
    this.template = Handlebars.templates.firstConnexion
    let array = {}

    array = JSON.parse(JSON.stringify(this.model))
    array.message = message
    const context = JSON.parse(JSON.stringify(array))
    // const context = JSON.parse(JSON.stringify(this.model))
    const templateData = this.template(context)
    this.$el.html(templateData)
    return this
  },

  validate: function (event) {
    const validate = async () => {
      try {
        let response = await this.model.saveNickname(document.getElementById('nickname').value)
        if (this.fileObject !== undefined) {
          response = await this.model.saveImage(this.fileObject)
          this.model.set({ image_url: response.image_url })
        }
        this.model.saveFirstLogin(false)
        Backbone.history.navigate('#home', true)
      } catch (error) {
        if (error.status !== 200) {
          this.render(error.responseJSON.message)
        }
      }
    }
    validate()
  },

  loadFile: function (event) {
    this.fileObject = new FormData()
    const image = document.getElementById('output')
    image.src = URL.createObjectURL(event.target.files[0])
    fetch(image.src)
      .then((response) => response.blob())
      .then((blob) => {
        this.fileObject.append('avatar',
          new File([blob], event.target.files[0].name, {
            type: event.target.files[0].type
          }))
      })
  }
})
