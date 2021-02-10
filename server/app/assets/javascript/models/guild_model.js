export const Guild = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    anagram: undefined,
    owner_id: undefined,
    score: undefined
  },

  initialize: function () {
    this.on('all', function (e) {
      //
    })
  },

  urlRoot: 'api/guilds/',
  url: function () {
    if (this.id !== undefined) { return this.urlRoot + this.id }
    return this.urlRoot
  }
})

// const guildsCollection = new Guilds()
// const guild = new Guild()

// async function fetchGuilds () {
//   await guild.fetch({
//     url: guild.urlRoot + '1',
//     success: function (response) {
//       console.log(response)
//     },
//     error: function (errorResponse) {
//       console.log('error')
//       console.log(errorResponse)
//     }
//   })
//   guildsCollection.add(guild)
// }

// fetchGuilds()

// into fetch after url
// type: 'post',
// contentType: 'application/json',
// data: JSON.stringify({
// 		// Change `*****` and `#####` with your own credentials.
// 		'appId': '*****',
// 		'appKey': '#####',
// 		'query': 'Starbucks OR frapp*',
// 		'fields': [
// 				'item_name',
// 				'brand_name',
// 				'nf_calories',
// 				'nf_serving_weight_grams']
// }),
// reset: true,
