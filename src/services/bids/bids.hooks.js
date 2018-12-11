const { authenticate } = require('feathers-authentication').hooks;
const auth = require('feathers-authentication-hooks');
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;

const newbid = require('../../hooks/newbid');

const deletequeue = require('../../hooks/deletequeue');

module.exports = {
  before: {
    all: [],
    find: [redisBefore()],
    get: [redisBefore()],
    create: [ authenticate('jwt'),
      auth.associateCurrentUser({ idField: 'username', as: 'bidder' }),
      //newbid()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [cache({duration: 3600 * 24 * 7}), redisAfter()],
    get: [cache({duration: 3600 * 24 * 7}), redisAfter()],
    create: [
      deletequeue()
    ],
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
