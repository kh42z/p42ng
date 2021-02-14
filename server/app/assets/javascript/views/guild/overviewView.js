export const GuildOverviewView = Backbone.View.extend({
  el: $('#app'),
  initialize: function () {
    this.render()
  },
  render: function () {
    console.log('overview')
    this.$el.html('overview')
  }
})
