(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.table = template({
    1: function (container, depth0, helpers, partials, data) {
      return '            <span>' +
    container.escapeExpression(container.lambda(depth0, depth0)) +
    '</span>\n'
    },
    3: function (container, depth0, helpers, partials, data) {
      let stack1; let helper; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const alias2 = container.hooks.helperMissing; const alias3 = 'function'; const alias4 = container.escapeExpression; const lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName]
        }
        return undefined
      }

      return '        <div class="infos">\n                <span class="league"></span>\n                <span class="number">' +
    alias4(((helper = (helper = lookupProperty(helpers, 'number') || (depth0 != null ? lookupProperty(depth0, 'number') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'number', hash: {}, data: data, loc: { start: { line: 10, column: 37 }, end: { line: 10, column: 47 } } }) : helper))) +
    '</span>\n                <img src="' +
    alias4(((helper = (helper = lookupProperty(helpers, 'profil_pic') || (depth0 != null ? lookupProperty(depth0, 'profil_pic') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'profil_pic', hash: {}, data: data, loc: { start: { line: 11, column: 26 }, end: { line: 11, column: 40 } } }) : helper))) +
    '" class="profile-pic"></img>\n' +
    ((stack1 = lookupProperty(helpers, 'each').call(alias1, (depth0 != null ? lookupProperty(depth0, 'infos') : depth0), { name: 'each', hash: {}, fn: container.program(4, data, 0), inverse: container.noop, data: data, loc: { start: { line: 12, column: 16 }, end: { line: 14, column: 25 } } })) != null ? stack1 : '') +
    '                <div class="status">\n                    <span class="pastille"></span>\n                    <span class="status-type">' +
    alias4(((helper = (helper = lookupProperty(helpers, 'status') || (depth0 != null ? lookupProperty(depth0, 'status') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'status', hash: {}, data: data, loc: { start: { line: 17, column: 46 }, end: { line: 17, column: 56 } } }) : helper))) +
    '</span>\n                    <img src="' +
    alias4(((helper = (helper = lookupProperty(helpers, 'slideshow') || (depth0 != null ? lookupProperty(depth0, 'slideshow') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'slideshow', hash: {}, data: data, loc: { start: { line: 18, column: 30 }, end: { line: 18, column: 43 } } }) : helper))) +
    '" class="slideshow" alt="' +
    alias4(((helper = (helper = lookupProperty(helpers, 'game') || (depth0 != null ? lookupProperty(depth0, 'game') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'game', hash: {}, data: data, loc: { start: { line: 18, column: 68 }, end: { line: 18, column: 76 } } }) : helper))) +
    '"></img>\n                </div>\n                <span>\n                    <button class="follow" type="button">\n                        ' +
    alias4(((helper = (helper = lookupProperty(helpers, 'follow') || (depth0 != null ? lookupProperty(depth0, 'follow') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'follow', hash: {}, data: data, loc: { start: { line: 22, column: 24 }, end: { line: 22, column: 34 } } }) : helper))) +
    '\n                    </button>\n                </span>\n        </div>\n'
    },
    4: function (container, depth0, helpers, partials, data) {
      return '                    <span>' +
    container.escapeExpression(container.lambda(depth0, depth0)) +
    '</span>\n'
    },
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      let stack1; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName]
        }
        return undefined
      }

      return '<div class="table">\n    <div class="categories">\n' +
    ((stack1 = lookupProperty(helpers, 'each').call(alias1, (depth0 != null ? lookupProperty(depth0, 'categories') : depth0), { name: 'each', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data: data, loc: { start: { line: 3, column: 8 }, end: { line: 5, column: 17 } } })) != null ? stack1 : '') +
    '    </div>\n' +
    ((stack1 = lookupProperty(helpers, 'each').call(alias1, (depth0 != null ? lookupProperty(depth0, 'row') : depth0), { name: 'each', hash: {}, fn: container.program(3, data, 0), inverse: container.noop, data: data, loc: { start: { line: 7, column: 4 }, end: { line: 26, column: 13 } } })) != null ? stack1 : '') +
    '</div>\n'
    },
    useData: true
  })
})()
