// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
const RedisSMQ = require("rsmq");
const auth = require('feathers-authentication-hooks');
const rsmq = new RedisSMQ({
  host: "127.0.0.1",
  port: 6379, ns: "rsmq"
});

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function newbid (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    rsmq.receiveMessage({
  qname: 'webhook-queue',
   }, (err, resp) => {
    if (!resp || !resp.id) return;
    console.log('Message received.', resp);

  // Do long logic here
});

    return Promise.resolve(hook);
  };
};
