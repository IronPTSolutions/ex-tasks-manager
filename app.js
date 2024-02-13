// Load env vars
require('dotenv').config();

const express = require('express');

// Init configurations
require('./configs/hbs.config');
require('./configs/db.config');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Application middlewares
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
})

// Application routes
const routes = require('./configs/routes.config');
app.use('/', routes);

const port = 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));
