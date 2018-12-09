const assert = require('assert');
const app = require('../../src/app');

describe('\'postitems\' service', () => {
  it('registered the service', () => {
    const service = app.service('postitems');

    assert.ok(service, 'Registered the service');
  });
});
