import {TwoFactorService} from "../../services/twoFactorService";

export const TwoFactorView = Backbone.View.extend({
    events: {
        'click .validate': 'validate_code'
    },
    initialize: function () {
        this.render()
    },
    el: $('#app'),

    render: function () {
        this.templateTwoFactor = Handlebars.templates.twoFactor
        this.$el.html(this.templateTwoFactor)
        return this
    },
    validate_code: function (event) {
        this.code = document.getElementById('code').value
        this.twoFactorService = new TwoFactorService()
        this.twoFactorService.auth(1, this.code).then(function() {
            Backbone.history.navigate('#home', { trigger: true} )
        }).catch(function() {
                console.log("invalidOrExpiredToken")
            }
        )
    },
})
