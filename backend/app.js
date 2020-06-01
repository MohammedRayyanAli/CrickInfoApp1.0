/* 
   Import Node Modules
 */

let express = require('express'); //express web framework
let app = express();  //Initialize express App
let logger = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');
let mongoose = require('mongoose'); //tool for MongoDb

//Authentication
let passport = require('passport');
let registrationRoutes = express.Router();
let bcrypt = require('bcryptjs');
let Registration = require('./models/user');

// import routes 
let players = require('./routes/api/players');
let users = require('./routes/api/user');

//Node Api Port
let port = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(passport.initialize());

// Passport
require('./config/passport')(passport);

// user and player Routes
app.use('/api/players', players);
app.use('/api/users', users);

//Db Connection
mongoose.connect('mongodb://127.0.0.1:27017/crickinfoAppDb', { useNewUrlParser: true });
let connection = mongoose.connection; connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

/*
Error Handlers
*/
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Listen to port - NodeJS
app.listen(port, () => console.log(`Server running on port ${port}`));
