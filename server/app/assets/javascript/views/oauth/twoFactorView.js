import {TwoFactorService} from "../../services/twoFactorService";

export const TwoFactorView = Backbone.View.extend({
    events: {
        'click .validate': 'validate_code'
    },
    initialize: function () {
        this.render()
    },
    el: $('#app'),

    render: function (message = '') {
        this.templateTwoFactor = Handlebars.templates.twoFactor
        this.$el.html(this.templateTwoFactor({ 'message': message }))
        return this
    },

    validate_code: function (event) {
        var current = this;

        this.code = document.getElementById('code').value
        this.twoFactorService = new TwoFactorService()
        this.twoFactorService.auth(this.code).then(function() {
            Backbone.history.navigate('#two_factor_connexion', { trigger: true} )
        }).catch(function() {
            current.render('Your token is either invalid or expired.')
        })
    },
})
