const { authenticate } = require('feathers-authentication').hooks;
const auth = require('feathers-authentication-hooks');
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [redisBefore()],
    get: [redisBefore()],
    create: [
      auth.associateCurrentUser({ idField: 'username', as: 'bidder' }, { idField: '_id', as: 'product_id'})
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [cache({duration: 3600 * 24 * 7}), redisAfter()],
    get: [cache({duration: 3600 * 24 * 7}), redisAfter()],
    create: [],
    update: [],
    patch: [],
    remove: []
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
