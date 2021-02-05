var AppView = Backbone.View.extend({
    el: $('#contentDiv'),
    initialize: function () {

        console.log('ready')
	    var templateInfo = document.getElementById("groceries-template").innerHTML;

	    var template = Handlebars.compile(templateInfo); // pre-compiled is better for production 
        var template = Handlebars.templates['groceries'];
        console.log(template)

        var context = {
            groceries:[
            {item: "Potato"},
            {item: "Flour"},
            {item: "Yogurt"},
            {item: "Beans"}
            ]
        }

        var templateData = template(context);
        console.log(templateData)

        this.render(templateData);
    },
    render: function (templateData) {
        console.log(templateData)

            this.$el.html(templateData);
    }
});
const appView = new AppView;
