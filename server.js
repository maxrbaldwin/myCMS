var express = require('express'),
    session = require('express-session'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

// Custom Modules
var sessionsHandler = require('./middleware/sessionHandler/sessionHandler');

var app = express();

// Call app routes
var admin = require('./routes/admin'),
    reporting = require('./routes/reporting'),
    web = require('./routes/web');

// Call error routes
var errorLogger = require('./err/logError.js'),
    clientError = require('./err/clientErrorHandler.js'),
    errorHandler = require('./err/errorHandler.js');

app.set('port', (process.env.port || 5000));
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.ss,
    cookie: {
        secure: true,
        expires: new Date().getTime() + 1800000
    }
}));

nunjucks.configure('views', {
    express: app,
    autoescape: true,
    watch: true
});

// Set session handler
app.use('my', sessionsHandler.admin);
app.use('/', sessionsHandler.client);

// Set app routes
app.use('/my', admin);
app.use('/reporting', reporting);
//A route for data from each one of our models
// app.use('/api', api);
app.use('/', web);

// Set app error handlers
app.use(errorLogger);
app.use(clientError);
app.use(errorHandler);

// Run server on port
app.listen(app.get('port'), function(e) {
    console.log('My CMS is running on port ' + app.get('port'));
});
