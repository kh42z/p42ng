const UsersView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },

  render: function () {
    const templateTopNav = Handlebars.templates.topnav
    const templateTable = Handlebars.templates.table

    const contextTopNav = {
      user: 'pganglof',
      profile_pic: '../../images/profile-pic.jpg'
    }

    const contextTable = {
      categories : [
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

      // row = model.response().map(x => {
      //   return {
      //     number: "1",
      //     profil_pic: '../../images/profile-pic.jpg',
  
      //     infos : [
      //       'pganglof',
      //       '42',
      //       '1',
      //       '5',
      //       '5',
      //     ],
  
      //     status: 'IN GAME',
      //     follow: 'Follow',
  
      //     slideshow: '../../icons/slideshow-ingame.svg',
      //     game: 'in game'}

      // })

      row : [{
        number: "1",
        profil_pic: '../../images/profile-pic.jpg',

        infos : [
          'pganglof',
          '42',
          '1',
          '5',
          '5',
        ],

        status: 'IN GAME',
        follow: 'Follow',

        slideshow: '../../icons/slideshow-ingame.svg',
        game: 'in game'}
      ]
    }


    // Handlebars.registerHelper("row", function(context, options) {
    //   var ret = "";
    
    //   for (let k = 0; k < 2; k++) {
    //     for (var i = 0, j = context.length; i < j; i++) {
    //       ret = ret + options.fn(context[i]);
    //     }
    //     console.log(i);
    //   }
    
    //   return ret;
    // });

    const templateDataTopNav = templateTopNav(contextTopNav)
    const templateDataUserTable = templateTable(contextTable)
    this.$el.html(templateDataTopNav + templateDataUserTable)
  }
})
export const usersView = new UsersView()
