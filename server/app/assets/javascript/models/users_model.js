// Backbone.emulateHTTP = true
// Backbone.emulateJSON = true

const Person = Backbone.Model.extend({
  defaults: {
    email: 'undefined'
  },

  initialize: function () {
    this.on('all', function (e) {
      // this.trigger(e)
      console.log('uid: ' + this.get('uid'))
      console.log(this.get('name') + ' event: ' + e)
    })
  },

  urlRoot: '/api/guilds/',
  url: function () {
    return this.urlRoot + this.id
  }

  // parse: function (response) {
  //   return response[1]
  // }
})

// const person = new Person({
//   name: 'Joe Zim',
//   age: 23
// })
// person.save() // POST
// persone.destroy() // DELETE

const People = Backbone.Collection.extend({
  initialize: function () {
    this.on('all', function (e) {
      console.log('People event: ' + e)
    })
  },
  model: Person
})

const person = new Person({ id: 1 })
person.fetch({
  success: function (response) {
    console.log('Inside success')
    console.log(response)
    console.log(response[2])
    console.log('after success')
    // console.log('parse: ' + person.parse(response))
  },
  error: function (errorResponse) {
    console.log(errorResponse)
  }
})

console.log('email: ' + person.get('email'))

const people = new People()
// people.create(person)

// console.log('parse: ' + person.parse())
