export const UsersView = Backbone.View.extend({
  events: {
    'click .follow': 'change_model'
  },

  initialize: function () {
    // this.listenTo(this.model, 'sync', function () {
    //   this.render()
    // }, this)

    // this.listenTo(this.model, 'change', function () {
    //   this.render()
    // }, this)
  },
  el: $('#app'),

  render: function () {
    const templateTable = Handlebars.templates.table
    const contextTopNav = {
      user: this.model.get('nickname'),
      profile_pic: '../../images/profile-pic.jpg'
    }

    const contextTable = {
      categories: [
        '', // League
        '', // Number
        '', // Image
        'Pseudo',
        'Guild',
        'General Rank',
        'Victories',
        'Total games',
        'Status',
        ''
      ],

      row: [{
        number: '1',
        profil_pic: '../../images/profile-pic.jpg',

        infos: [
          this.model.get('nickname'),
          '42',
          '1',
          '5',
          '5'
        ],

        status: 'IN GAME',
        follow: 'Follow',

        slideshow: '../../icons/slideshow-ingame.svg',
        game: 'in game'
      },

      {
        number: '1',
        profil_pic: '../../images/profile-pic.jpg',

        infos: [
          this.model.get('nickname'),
          '42',
          '1',
          '5',
          '5'
        ],

        status: 'IN GAME',
        follow: 'Follow',

        slideshow: '../../icons/slideshow-ingame.svg',
        game: 'in game'
      }
      ]
    }
    const templateDataUserTable = templateTable(contextTable)
    this.$el.html(templateDataUserTable)
    return this
  },

  change_model: function () {
    console.log('change_model')
    this.model.set({ nickname: 'pauline' })
  }
})
