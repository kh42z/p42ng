$(function() {
    var AppView = Backbone.View.extend({
        el: $('#app'),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html("This text was written in a Backbone view!");
        }
    });

    var App = new AppView;
});
