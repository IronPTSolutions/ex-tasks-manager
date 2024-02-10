require('dotenv').config();
require('../configs/db.config');
const Issue = require('../models/issue.model');
const issues =  require('../data/issues');


Issue.create(issues)
  .then((issues) => console.log(`${issues.length} issues created`))
  .catch((error) => console.error(error));
