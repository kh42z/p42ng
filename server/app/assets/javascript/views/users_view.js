const UsersView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
  },

  render: function () {
    const templateTopNav = Handlebars.templates.topnav
    const templateTable = Handlebars.templates.table

    const contextTopNav = {
      user: 'pganglof'
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

      number : "1",

      infos : [
        'pganglof',
        '42',
        '1',
        '5',
        '5',
      ],

      status: 'IN GAME',
      follow: 'Follow'
    }

    const templateDataTopNav = templateTopNav(contextTopNav)
    const templateDataUserTable = templateTable(contextTable)
    this.$el.html(templateDataUserTable)
  }
})
export const usersView = new UsersView()
