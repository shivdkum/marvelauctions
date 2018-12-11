// Initializes the `bids` service on path `/bids`
const createService = require('feathers-mongoose');
const createModel = require('../../models/bids.model');
const hooks = require('./bids.hooks');
const filters = require('./bids.filters');
//const { authenticate } = require('feathers-authentication').hooks;
const auth = require('feathers-authentication-hooks');
var RSMQWorker = require( "rsmq-worker" );
var worker = new RSMQWorker( "webhook-queue" );
const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ({
  host: "127.0.0.1",
  port: 6379, ns: "rsmq"
});

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'bids',
    Model,
    paginate
  };

    // Initialize our service with any options it requires
  app.use('/bids', createService(options));
  // app.service('/bids').create({ current_price: 10000 });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bids');

  service.hooks(hooks);

  worker.on( "message", function( msg, next, id ){
  	// process your message
    rsmq.receiveMessage({
  qname: 'webhook-queue',
   }, (err, resp) => {
    if (!resp || !resp.id) return;
    //console.log('Message received.', resp);

  // Do long logic here
      //app.service('/bids').create({ current_price: msg });
     });
  	// console.log("Message id : " + id);
    var arr = msg.split(" ");
    app.service('/bids').create( { current_price: arr[0], bidder: arr[1], product_id: arr[2] });

  	console.log(msg);
  	next()
  });

  // optional error listeners
  worker.on('error', function( err, msg ){
      console.log( "ERROR", err, msg.id );
  });
  worker.on('exceeded', function( msg ){
      console.log( "EXCEEDED", msg.id );
  });
  worker.on('timeout', function( msg ){
      console.log( "TIMEOUT", msg.id, msg.rc );
  });

  worker.start();

  if (service.filter) {
    service.filter(filters);
  }
};
