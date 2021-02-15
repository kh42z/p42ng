(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.firstConnexion = template({
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      return '<label>Nickname:</label>\n<textarea id="nickname" name="nickname"\n          rows="5" cols="33">\n</textarea>\n\n<a class="validate" href="#home">Validate</a>'
    },
    useData: true
  })
})()
