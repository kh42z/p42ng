(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.oauth = template({
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      return "<div class=\"oauth\">\n    <button class=\"signIn\"\n    onclick=\"window.location.href='http://localhost:3000/auth/marvin?auth_origin_url=http://localhost:3000/#connexion'\">Sign in</button>\n</div>"
    },
    useData: true
  })
})()
