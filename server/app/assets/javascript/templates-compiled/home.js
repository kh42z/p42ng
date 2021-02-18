(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.home = template({
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      return '<div class="home">\n    <div class="pong-gif"></div>\n    <div class="play-gif" href="#play"></div>\n</div>'
    },
    useData: true
  })
})()
