export const GuildOverviewView = Backbone.View.extend({
  initialize: function () {
    this.render()
  },
  el: $('#app'),
  render: function () {
    console.log('overview')
    this.$el.html('overview')
    return this
  }
})
