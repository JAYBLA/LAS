var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt'),
      bodyParser = require('body-parser'),
      flash = require('connect-flash'),
      csurf = require('csurf'),
      messages = require('express-messages'),
      session = require('express-session');
const cookieParser = require("cookie-parser");
const paginate = require("express-paginate");
const Sequelize  = require('sequelize');
const db = require("../models");



const redirectLogin = function (req, res, next) {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};


const sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  host: "localhost",
  username: "root",
  password: "",
  database: "ccd_test",
  dialect: "mysql",
});
sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
  
  


// keep this before all routes that will use pagination
router.use(paginate.middleware(10, 10));

(sequelize == db.sequelize), ( Sequelize == db.Sequelize);
var sessionStore = new session.MemoryStore();

router.use(cookieParser("secret"));
router.use(
  session({
    cookie: {
      maxAge: 86400000,
    },
    store: sessionStore,
    saveUninitialized: false,
    resave: true,
    secret: "secret",
  })
);

// express-messages middleware
router.use(flash());
router.use((req, res, next) => {
  res.locals.errors = req.flash("danger");
  res.locals.successes = req.flash("success");
  next();
});

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// setup route middlewares
var csrfProtection = csurf({
  cookie: true,
});

//register user
router.get("/init", function (req, res, next) {
  const firstName = "Admin";
  const lastName = "Super";
  const userName = firstName.concat("." , lastName)
  const password = "123";
  bcrypt.hash(password, 10, function (err, hash) {
    var user = sequelize.define("users", {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      userName: Sequelize.STRING,
      password: Sequelize.STRING,
      statusId: Sequelize.INTEGER
    });
    sequelize.sync().then(function () {
      return user
        .create({
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          password: hash,
          statusId: 1
        },{
          include: [{
            all: true
          }]
        })
        .then(function (data) {
          console.log(
            data.get({
              plain: true,
            })
          );
        });
    });
  });
});




// route for user Login
router.post("/auth", function (req, res, next) {
  var userName = req.body.userName;
  var password = req.body.password;

  var user = sequelize.define("users", {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    statusId: Sequelize.INTEGER
  });
  sequelize.sync().then(function () {
    return user
      .findOne({
        where: {
          userName: userName,
        },
      })
      .then(function (user) {
        if (user == null) {
           req.flash(
            "danger",
            "Incorrect Details"
          );
          res.redirect("/login");
        } else {
          bcrypt.compare(password, user.password, function (err, next) {
            if (err) {
              req.flash("danger", "Incorrect details.");
              res.redirect("/login");
            }
            if (next) {
              req.flash('success', 'Welcome ' + user.userName)
              req.session.userId = user.userName;
              req.session.save(() => res.redirect("/dashboard"));
            } else {
              req.flash("danger", "Incorrect details.");
              res.redirect("/login");
            }
          });
        }
      });
  });
   then(function(data){
    console.log(data.get({
      plain: true
    }))
  })
});







/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: "CCD | LOGIN"})
  
});

router.get('/user', function(req, res, next){
  res.render('user', {title: "CCD | USERS"})
})

router.get('/user/add', function(req, res, next){
  res.render('user_add', {title: "CCD | ADD USER"})
})

router.get('/user/edit', function(req, res, next){
  res.render('user_edit', {title: "CCD | EDIT USER"})
})

router.get('/user/change-password', function(req, res, next){
  res.render('user_password', {title: "CCD | USERS"})
})

module.exports = router;
