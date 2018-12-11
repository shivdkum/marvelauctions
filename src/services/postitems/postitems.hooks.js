const { authenticate } = require('feathers-authentication').hooks;
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;
const auth = require('feathers-authentication-hooks');

const placeBid = require('../../hooks/place-bid');

const slotbooked = require('../../hooks/slotbooked');

const postitemUpdate = require('../../hooks/postitem-update');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate('jwt'),
      slotbooked(),
      auth.associateCurrentUser({ idField: 'username', as: 'seller_username' })
    ],
    update: [ authenticate('jwt')],
    patch: [ authenticate('jwt'),
      placeBid(),
      auth.associateCurrentUser({ idField: 'username', as: 'top_bidder' }),
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
