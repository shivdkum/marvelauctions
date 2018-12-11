// Initializes the `auctions` service on path `/auctions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/auctions.model');
const hooks = require('./auctions.hooks');
const filters = require('./auctions.filters');
var RSMQWorker = require( "rsmq-worker" );
var worker = new RSMQWorker( "auction-queue" );
// const deleteauctionslot = require('../../hooks/deleteauctionslot');
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
    name: 'auctions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/auctions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('auctions');

  service.hooks(hooks);

  worker.on( "message", function( msg, next, id ){
  	// process your message
    rsmq.receiveMessage({
  qname: 'auction-queue',
   }, (err, resp) => {
    if (!resp || !resp.id) return;
    //console.log('Message received.', resp);

  // Do long logic here
      //app.service('/bids').create({ current_price: msg });
     });
  	// console.log("Message id : " + id);
   var arr = msg.split(" ");
    app.service('/auctions').remove( { date: arr[0], start_time: arr[1] });
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
  //



  if (service.filter) {
    service.filter(filters);
  }
};
