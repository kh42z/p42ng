export const Ladder = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    desc: undefined,
    mmr_threshold: undefined,
  },

  initialize: function (id) {
    /*this.on('all', function (e) {
      //
    })*/
		this.url = "/api/ladders/" + id
		console.log(this.url)
		this.fetch({
			url: this.url,
			success: function (response) {
				console.log(response)
			},
			error: function (errorResponse) {
				console.log('error')
				console.log(errorResponse)
			}
		})
	//	console.log(this.id)
  },

  urlRoot: 'api/ladders/',
  url: function () {
    if (this.id !== undefined) { return this.urlRoot + this.id }
    return this.urlRoot
  }
})
