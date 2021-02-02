/*
    Dependencies:

    express:                Framework for nodejs
    http:                   Used to create a server
    path:                   Used to combine relative paths and show our app where its static files are, etc.
    express-handlebars:     Used to configure handlebars in an express session
    mongoose:               Used as a wrapper for mongodb, we use it to connect to the database
    express-session:        Allows sessions which are basically how users log in to their account
    connect-mongo:          Used for storing sessions in our database
    heroku-ssl-redirect:    Used so that we can easily use our https and reroute anyone who tries to access http version
    axios:                  Used to make requests to routes from inside socket.io, so that we can save our conversation in
                            our database
    body-parser:            Used to parse information from forms mainly
    socket.io:              Create a socket connection with server and client, how we send messages without reloading
    connect-flash:          This is in order to flash messages from the server such as 'Incorrect password'
                            and other things of that nature
    User:                   User model which we use here to delete unverified accounts on an interval
    Conversation:           Conversation model which we use to lookup old messages and delete them


    Other:

    PORT:           The default port number that the server will run on if there is no environmental
                    variable configured (which would happen when deployed on heroku)
    formatMessage:  A utility function that returns a formatted message easy for the client code to use.
*/

/*
* Dependencies
* */
let express = require("express"),
    http    = require("http"),
    path    = require("path");
let mongoose = require("mongoose");
let session = require("express-session");
let mongoStore = require("connect-mongo")(session);
let sslRedirect = require("heroku-ssl-redirect");
let axios = require("axios");
let bodyParser = require("body-parser");
let cors = require("cors");
const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io    = require("socket.io")(server);
// const formatMessage = require("./util/messages");
const flash = require("connect-flash");


const morgan = require("morgan")

/*
* Models for our database objects
* */
const User = require("./models/user")
// const Conversation = require('./models/conversation');

/*
* Gives application access to environmental variables
* */
require('dotenv').config();


/* ////////////////////////////////////////////////////////////////////////////////////////////////
* DATABASE DRIVER CODE
* */

/*
* Connect to database using environmental variables
* URI: The uri given to us by MongoDb in order to remotely connect to our DB
*/

const URI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@basebookstack-zx7sx.mongodb.net/${process.env.DBDATABASE}?retryWrites=true&w=majority`;
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to mongodb'));


/*
* Use sessions for maintaining logins
* */
app.use(session({
    secret: 'Server initialized',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: db
    })
}));

/**
 * CORS enables react front end to communicate and fetch data from the express backend
 */
//app.use(cors());
// http logger -- So we know what routes are being called from command line
app.use(morgan('tiny'));

// PARSE INCOMING REQUESTS
/*
* Parse incoming requests.
* i.e. allow us to read form data by accessing
* request.body.<dataname> and request.query.<dataname> in routes
* */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
* Include every routing file from /routes
* this is where the server calls are handled, the main bulk of the project
* */
let static_routes = require('./routes/static_routes');
app.use('/api', static_routes);

/* Use and serve static files in production */
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/*
*
* When we call next from the route files, the next(error) function call passes through here,
* and sets the error message if a 404 is encountered i.e. if the route doesn't exist/invalid link
*
* After this, we arrive at the error handler described below
*
* */
app.use((request, response, next) => {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

/*
* Error handler
*
* When we call next from the route files, this is where the next call arrives to
*
* Here we call the 'error.hbs' file and pass in the error message and status
* */
app.use((err, request, response, next) => {

    response.status(err.status || 500);

    response.send({
        message: err.message,
        error: {},
        error_code: err.status,
        title: 'Error'
    });
});

/*
 * Create Server
 */
server.listen((process.env.PORT || PORT), () => {
    console.log("BookStack is running in port " + PORT);
});

