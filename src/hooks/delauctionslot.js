// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({
  host: "127.0.0.1",
  port: 6379, ns: "rsmq"
});

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function delauctionslot (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    rsmq.deleteQueue({ qname: 'auction-queue'}, (err, resp) => {
    if (resp === 1) console.log('queue deleted');
 });

    return Promise.resolve(hook);
  };
};
