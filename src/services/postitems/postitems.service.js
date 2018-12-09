// Initializes the `postitems` service on path `/postitems`
const createService = require('feathers-mongoose');
const createModel = require('../../models/postitems.model');
const hooks = require('./postitems.hooks');
const filters = require('./postitems.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'postitems',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/postitems', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('postitems');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
