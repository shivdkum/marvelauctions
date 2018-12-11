const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
// const sync = require('feathers-sync');

const authentication = require('./authentication');

const mongoose = require('./mongoose');
const routes = require('feathers-hooks-rediscache').cacheRoutes;
const redisClient = require('feathers-hooks-rediscache').redisClient;

var https = require('https');
var fs = require('fs');
var http = require('http');
var privateKey = fs.readFileSync('C:/Users/shraamanar/source/repos/ExpressApp2/ExpressApp2/public/server.key', 'utf8');
var certificate = fs.readFileSync('C:/Users/shraamanar/source/repos/ExpressApp2/ExpressApp2/public/server.cert', 'utf8');
var credentials = { key: privateKey, cert: certificate };


const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(mongoose);
app.configure(rest());
app.configure(socketio());
app.configure(redisClient);
app.use('/cache', routes(app));

//Sync Setup
// app.configure(sync.mongodb({
//  db: existingConnection
//  collection: 'events'
//}));
//app.configure(sync.redis({
//  db: redisInstance
//}));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443);
// httpServer.listen(3030);

module.exports = app;
