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
    find: [],
    get: [],
    create: [ auth.associateCurrentUser({ idField: 'username', as: 'bidder' })],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
