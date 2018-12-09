const assert = require('assert');
const app = require('../../src/app');

describe('\'bids\' service', () => {
  it('registered the service', () => {
    const service = app.service('bids');

    assert.ok(service, 'Registered the service');
  });
});
