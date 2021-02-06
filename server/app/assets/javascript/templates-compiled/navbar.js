(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.navbar = template({
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      let helper; const lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName]
        }
        return undefined
      }

      return '\n<div class="navbar-item">\n    <ul id="id">\n            <li id="home_button"><a href="#home">Home</a></li>\n            <li id="users_button"><a href="#users">Users</a></li>\n\n            <p>' +
    container.escapeExpression(((helper = (helper = lookupProperty(helpers, 'welcome') || (depth0 != null ? lookupProperty(depth0, 'welcome') : depth0)) != null ? helper : container.hooks.helperMissing), (typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { name: 'welcome', hash: {}, data: data, loc: { start: { line: 12, column: 15 }, end: { line: 12, column: 26 } } }) : helper))) +
    '</p>\n    </ul>\n</div>'
    },
    useData: true
  })
})()
