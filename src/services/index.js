const users = require('./users/users.service.js');
const auctions = require('./auctions/auctions.service.js');
const postitems = require('./postitems/postitems.service.js');
const bids = require('./bids/bids.service.js');
const uploads = require('./uploads/uploads.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(auctions);
  app.configure(postitems);
  app.configure(bids);
  app.configure(uploads);
};
