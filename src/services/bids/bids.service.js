// Initializes the `bids` service on path `/bids`
const createService = require('feathers-mongoose');
const createModel = require('../../models/bids.model');
const hooks = require('./bids.hooks');
const filters = require('./bids.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bids',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bids', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bids');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
