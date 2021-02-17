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

  render: function () {
    this.template = Handlebars.templates.firstConnexion
    const context = {
      image: this.model.get('image_url')
    }
    const templateData = this.template(context)
    this.$el.html(templateData)
    return this
  },

  validate: function (event) {
    const validate = async () => {
      await this.model.saveNickname(document.getElementById('nickname').value)
      if (this.fileObject !== undefined) {
        const response = await this.model.saveImage(this.fileObject)
        this.model.set({ image_url: response.image_url })
      }
      this.model.saveFirstLogin(false)
      Backbone.history.navigate('#home', true)
    }
    validate()
  },

  on_change: function () {
    console.log('CHANGE')
    console.log(document.getElementById('picField'))
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
