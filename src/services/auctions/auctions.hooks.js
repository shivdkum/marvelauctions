const { authenticate } = require('feathers-authentication').hooks;

const deleteauctionslot = require('../../hooks/deleteauctionslot');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
   authenticate('jwt')
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ deleteauctionslot() ]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
