/* global db base_dir abs_path */

global.base_dir = __dirname;
global.abs_path = function ( path ) {
  return `${base_dir}/${path}`;
};
global.include = function ( file ) {
  return require( abs_path( file ) );
};

require( 'dotenv' ).config();

const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );
const passport = require( 'passport' );
const MongoClient = require( 'mongodb' ).MongoClient;
const helmet = require( 'helmet' );
const compression = require( 'compression' );
//const csrf = require( 'csurf' );
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );
const errorhandler = require( 'errorhandler' );
const protect = require( '@risingstack/protect' );

const i18next = require( 'i18next' );
const i18nextMiddleware = require( 'i18next-express-middleware' );
const Backend = require( 'i18next-node-fs-backend' );

const routes = require( './routes/routes' );

// Gets current development state of the node environment (production|development). Is set in .env file
const state = process.env.NODE_ENV;

const app = express();

i18next
  .use( Backend )
  .use( i18nextMiddleware.LanguageDetector )
  .init( {
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'sv',
    preload: [ 'en', 'sv' ],
  } );

MongoClient.connect( process.env.DB_URL, { useNewUrlParser: true }, async function ( err, client ) {
  if ( err ) return console.error( 'mongodb', err );
  global.db = client.db( 'digitalungdom' );

  // Enable trust proxy if in production (needed for nginx?)
  if ( state === 'production' ) app.enable( 'trust proxy' );

  // Middleware
  // Compression
  app.use( compression() );

  // Security
  // Helmet
  app.use( helmet() );
  app.use( helmet.permittedCrossDomainPolicies() );
  app.use( helmet.referrerPolicy( { policy: 'same-origin' } ) );
  app.use( helmet.hsts( {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  } ) );

  // Protect against xss
  app.use( protect.express.xss( { body: true, loggerFunction: console.error } ) );

  // React build folder
  app.use( express.static( 'build' ) );
  // i18n handler
  app.use( "/locales", express.static( 'locales' ) );
  app.post( '/static/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler( i18next ) );

  // Body parser
  app.use( bodyParser.json( { limit: '100kb' } ) );
  app.use( bodyParser.urlencoded( { limit: '100kb', extended: false } ) );
  app.use( bodyParser.raw( { limit: '100kb' } ) );
  app.use( bodyParser.text( { limit: '100kb' } ) );

  app.use( cookieParser() );

  // Cross site request and cross site request forgery
  app.use( cors( { origin: false } ) );
  //app.use( csrf( { cookie: true } ) );

  // Sessions
  // Please change secret in production (should be a random string, just slam ones head on the keyboard)
  app.use( session( {
    secret: 'i love javascript',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore( {
      db: db,
    } ),
    cookie: { secure: ( state === 'production' ) }
  } ) );

  // Passportjs for local strategy authentication
  app.use( passport.initialize() );
  app.use( passport.session() );

  // File upload, max 1MiB
  app.use( fileUpload( { limits: { fileSize: 1 * 1024 * 1024 } } ) );

  // Use routes defined in routes/routes.js
  app.use( '/api/', routes );

  // Development error handling
  if ( state === 'development' ) app.use( errorhandler() );

  // Production error handler
  app.use( function ( err, req, res, next ) {
    if ( !err.statusCode ) err.statusCode = 500;
    if ( !err.customMessage ) err.customMessage = 'Internal Server Error';

    console.error( err );

    return res.status( err.statusCode ).send( `${err.statusCode} : ${err.customMessage}` );
  } );

  // Use react front-end
  app.get( '*', function ( req, res ) { res.sendFile( path.join( __dirname, '/build/index.html' ) ); } );

  // set port to 8080
  app.set( 'port', ( 8080 ) );

  // Start server
  app.listen( app.get( 'port' ), () => { console.log( state, ': listening on ', app.get( 'port' ) ); } );
} );