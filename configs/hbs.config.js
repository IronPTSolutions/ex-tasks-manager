const hbs = require('hbs');
const { options } = require('./routes.config');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (path, match, options) => {
  return (path === match) ? 'active' : '';
});

hbs.registerHelper('isOwnedBy', function (resource, currentUser, options) {
  if (resource.owner == currentUser.id) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})
