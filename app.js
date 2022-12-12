const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const searchesRouter = require('./routes/searches');

let app = express();
let sess = {
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret',
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sess));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// before each method
app.use(function (req, res, next) {
  app.locals.flash = req.flash();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts', commentsRouter);
app.use('/search', searchesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  req.app.get('env') === 'development'
    ? next(createError(404))
    : res.render('./404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render(
    req.app.get('env') === 'development'
      ? 'error'
      : './500', { url: process.env.npm_package_url }
  );
});

module.exports = app;
