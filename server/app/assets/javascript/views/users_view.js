
export const UsersView = Backbone.View.extend({
  initialize: function () {},
  el: $('#app'),

  render: function () {
    const templateTopNav = Handlebars.templates.topnav
    const templateTable = Handlebars.templates.table
    const contextTopNav = {
      user: this.model.get('nickname'),
      profile_pic: '../../images/profile-pic.jpg'
      // profile_pic: this.model.get('image_url') // image url -> server wrong photo
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
      }]
    }
    const templateDataTopNav = templateTopNav(contextTopNav)
    const templateDataUserTable = templateTable(contextTable)
    this.$el.html(templateDataTopNav + templateDataUserTable)
    return this
  }
})
