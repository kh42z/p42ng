export const Guild = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    anagram: undefined,
    owner_id: undefined,
    score: undefined,
    oauthService: undefined
  },


  initialize: function (id) {
    /* this.on('all', function (e) {
      //
    }) */
  //   this.url = '/api/guilds/' + id
  //   console.log(this.url)
  //   this.fetch({
  //     url: this.url,
  //     success: function (response) {
  //       console.log(response)
  //     },
  //     error: function (errorResponse) {
  //       console.log('error')
  //       console.log(errorResponse)
  //     }
  //   })
  //   console.log(this.id)
  },


  urlRoot: 'api/guilds',
  url: function () {
    if (this.id !== undefined) { return this.urlRoot + this.id }
    return this.urlRoot
  },

  create: function (url) {
    this.set({
      url: url,
      data: {
        name: 'test',
        anagram: '',
        owner_id: '1',
        score: '0'
      },
      success: function (response) {
        console.log(response)
      },
      error: function (errorResponse) {
        console.log('error')
        console.log(errorResponse)
      }
    })
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
