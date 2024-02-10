const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (path, match, options) => {
  return (path === match) ? 'active' : '';
})
