const express = require('express');
const router = express.Router();

 
const userFile = require('./users');
router.use(userFile);

//initiate session variable (userId)
const redirectLogin = function (req, res, next) {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

/* GET home page. */
router.get('/dashboard', redirectLogin, function(req, res, next){
  res.render('index' , {
    title: "CCD | HOME",
    userData: req.session.userId
  })
})

router.get('/project', redirectLogin, function(req, res, next) {
  res.render('project', { title: "CCD | PROJECT" ,
  userData: req.session.userId});
});

router.get('/project/add', redirectLogin, function(req, res, next){
  res.render('project_add', {title: "CCD | ADD PROJECT",
  userData: req.session.userId})
})

router.get('/project/edit', redirectLogin, function(req, res, next){
  res.render('project_edit', {title: "CCD | EDIT PROJECT",
  userData: req.session.userId})
})

router.get('/location', redirectLogin, function(req, res, next){
  res.render('location', {title: "CCD | LOCATION",
  userData: req.session.userId})
})

router.get('/location/add', redirectLogin, function(req, res, next){
  res.render('location_add', {title: "CCD | LOACTION ADD",
  userData: req.session.userId})
})

router.get('/location/edit', redirectLogin, function(req, res, next){
  res.render('location_edit' , {title: "CCD | EDIT LOCATION",
  userData: req.session.userId})
})

router.get('/block', redirectLogin, function(req, res, next){
  res.render('block', {title: "CCD | BLOCK",
  userData: req.session.userId})
})

router.get('/block/add' , redirectLogin, function(req, res, next){
  res.render('block_add', {title: "CCD | ADD BLOCK",
  userData: req.session.userId})
})

router.get('/block/edit', redirectLogin, function(req, res, next){
  res.render('block_edit', {title: "CCD | EDIT BLOCK" ,
  userData: req.session.userId})
})

router.get('/plot', redirectLogin, function(req, res, next ){
  res.render('plot', {title: "CCD | PLOT",
  userData: req.session.userId})
})

router.get('/plot/add', redirectLogin, function(req, res, next){
  res.render('plot_add', {title: "CCD | ADD PLOT",
  userData: req.session.userId})
})

router.get('/plot/edit', redirectLogin, function(req, res, next){
  res.render('plot_edit', {title: "CCD | EDIT PLOT",
  userData: req.session.userId})
})

router.get('/allocation', redirectLogin, function(req, res, next){
  res.render('allocation', {title: "CCD | ALLOCATION",
  userData: req.session.userId})
})

router.get('/allocation/add', redirectLogin, function(req, res, next){
  res.render('new_allocation', {title: "CCD | NEW ALLOCATION",
  userData: req.session.userId})
})

router.get('/user', redirectLogin, function(req, res, next){
  res.render('user', {title: "CCD | USERS",
  userData: req.session.userId})
})

router.get('/user/add', redirectLogin, function(req, res, next){
  res.render('user_add', {title: "CCD | ADD USER",
  userData: req.session.userId})
})

router.get('/user/edit', redirectLogin, function(req, res, next){
  res.render('user_edit', {title: "CCD | EDIT USER",
  userData: req.session.userId})
})

router.get('/user/change-password', redirectLogin, function(req, res, next){
  res.render('user_password', {title: "CCD | USERS",
  userData: req.session.userId})
})

module.exports = router;
