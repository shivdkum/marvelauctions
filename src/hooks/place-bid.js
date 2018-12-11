// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({
  host: "127.0.0.1",
  port: 6379, ns: "rsmq"
});

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function placeBid (hook) {

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    price = `${hook.data.current_price}`;

    rsmq.createQueue({ qname: 'webhook-queue'}, (err, resp) => {
    if (resp === 1) console.log('queue created');

  rsmq.sendMessage({
    qname: 'webhook-queue',
    message: `${price}`,
  }, (err, resp) => {
    if (resp) console.log('Message sent. ID:', resp);
    });
  });

    return Promise.resolve(hook);
  };
};
