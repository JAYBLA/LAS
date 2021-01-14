var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//routers init
const indexRouter = require('./routes/index');
const mainRouter = require('./routes/index');
const projectRouter = require('./routes/index');
const projectAddRouter = require('./routes/index');
const projectEditRouter = require('./routes/index');
const locationRouter = require('./routes/index');
const locationAddRouter = require('./routes/index');
const locationEditRouter = require('./routes/index');
const blockRouter = require('./routes/index');
const blockAddRouter = require('./routes/index');
const blockEditRouter = require('./routes/index');
const plotRouter = require('./routes/index');
const plotAddRouter = require('./routes/index');
const plotEditRouter = require('./routes/index');
const allocRouter = require('./routes/index');
const allocNewRouter = require('./routes/index');
const reportRouter = require('./routes/index');
const userRouter = require('./routes/users');
const userAddRouter = require('./routes/users');
const userEditRouter = require('./routes/users');
const userPassword = require('./routes/users')
const initRouter = require('./routes/index');
const loginRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views/'),
  path.join(__dirname, 'views/project'),
  path.join(__dirname, 'views/allocation'),
  path.join(__dirname, 'views/block'),
  path.join(__dirname, 'views/location'),
  path.join(__dirname, 'views/plot'),
  path.join(__dirname, 'views/user')]);
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', mainRouter);
app.use('/project', projectRouter);
app.use('/project/add', projectAddRouter);
app.use('/project/edit', projectEditRouter);
app.use('/location', locationRouter);
app.use('/location/add', locationAddRouter);
app.use('/location/edit', locationEditRouter);
app.use('/block', blockRouter);
app.use('/block/add', blockAddRouter);
app.use('/block/edit', blockEditRouter);
app.use('/plot', plotRouter);
app.use('/plot/add', plotAddRouter);
app.use('/plot/edit', plotEditRouter);
app.use('/user', userRouter);
app.use('/user/add', userAddRouter);
app.use('/user/edit', userEditRouter);
app.use('/user/change-password', userPassword);
app.use('/allocation', allocRouter);
app.use('/allocation/add', allocNewRouter);
app.use('/init', initRouter);
app.use('/login', loginRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
