const { authenticate } = require('feathers-authentication').hooks;
const redisBefore = require('feathers-hooks-rediscache').redisBeforeHook;
const redisAfter = require('feathers-hooks-rediscache').redisAfterHook;
const cache = require('feathers-hooks-rediscache').hookCache;
const auth = require('feathers-authentication-hooks');

const placeBid = require('../../hooks/place-bid');

const postitemUpdate = require('../../hooks/postitem-update');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate('jwt'),
      auth.associateCurrentUser({ idField: 'username', as: 'seller_username' })
    ],
    update: [ authenticate('jwt'),
      placeBid(),
      auth.associateCurrentUser({ idField: 'username', as: 'top_bidder' }),
      // postitemUpdate()
    ],
    patch: [
      placeBid(),
      auth.associateCurrentUser({ idField: 'username', as: 'top_bidder' }),
    //   postitemUpdate()
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
