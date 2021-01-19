const express = require('express');
const db = require('../models');
const router = express.Router();
const paginate = require("express-paginate");
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  host: "localhost",
  username: "root",
  password: "",
  database: "ccd_test",
  dialect: "mysql",
});
sequelize.authenticate()

// keep this before all routes that will use pagination
router.use(paginate.middleware(10, 10));

(sequelize == db.sequelize), (Sequelize == db.Sequelize);


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

//Global
var project = sequelize.define('projects', {
  projectName: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  statusId: Sequelize.INTEGER
});

var location = sequelize.define('locations', {
  locationName: Sequelize.STRING,
  projectId: Sequelize.INTEGER
})

var block = sequelize.define('blocks', {
  blockName: Sequelize.STRING,
  locationId: Sequelize.INTEGER
})

var plot = sequelize.define('plots', {
  plotNumber: Sequelize.STRING,
  plotSize: Sequelize.STRING,
  plotUseId: Sequelize.INTEGER,
  blockId: Sequelize.INTEGER,
  statusId: Sequelize.INTEGER
})

var plotuse = sequelize.define('plotuses', {
  plotUseName: Sequelize.STRING
})

var status = sequelize.define('statuses', {
  statusName: Sequelize.STRING
})

var user = sequelize.define("users", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
  statusId: Sequelize.INTEGER
})

var plotuse = sequelize.define("plotuses", {
  plotUseName: Sequelize.STRING
})

router.post('/plotuse', redirectLogin, function (req, res, next) {
  sequelize.sync().then(function () {
    return db.plotuse
      .create({
        plotUseName: req.body.plot_use_name
      }).then(function (plotUse) {
        console.log(plotUse)
        req.flash('success', 'Plot Use Added Successfully')
        res.redirect('/dashboard')
      })
  })
})

/* GET home page. */
router.get('/dashboard', redirectLogin, function (req, res, next) {
  sequelize.sync().then(function () {
    return db.plotuse
      .findAll().then(function (plotuse) {
        if (!plotuse) {
          req.flash('danger', 'Not plot Use')
        } else {
          res.render('index', {
            title: "CCD | HOME",
            userData: req.session.userId,
            plotUseData: plotuse
          })
        }
      })
  })
})

router.post('/projectadd', redirectLogin, function (req, res, next) {
  var ProjectName = req.body.project_name;
  var userid = req.session.userId.id;
  var statusid = req.body.status_number;
  sequelize.sync().then(function () {
    return db.project
      .create({
        projectName: ProjectName,
        userId: userid,
        statusId: statusid
      }, {
        include: [{
            model: db.status,
            as: 'status'
          },
          {
            model: db.user,
            as: 'user'
          }
        ]
      }).then(function (data) {
        if (!data) {
          req.flash('danger', 'Project Not Added');
          res.redirect('/project')
        } else {
          req.flash('success', 'Project Added Successfully')
          res.redirect('/project')
        }

      })
  })
})

router.get('/project', redirectLogin, function (req, res, next) {
  sequelize.sync().then(function () {
    return db.project
      .findAll({
        include: [{
            model: db.user,
            as: 'user'
          },
          {
            model: db.status,
            as: 'status'
          }
        ]
      }).then(function (dataProj) {
        console.log(dataProj)
        if (!dataProj) {

          req.flash('danger', 'No Project Found')
          res.render('project')
        } else {
          
          sequelize.sync().then(function () {
            return db.location
              .findAndCountAll({
                include: [{
                  model: db.project,
                  as: 'project',
                }],
                group: ['project.id']
              }).then(function (locData) {
                //console.log(locData.count)
                var data =locData.count
                // var arrayObj = [{key1:'value1', key2:'value2'},{key1:'value1', key2:'value2'}];

                data = data.map(item => {
                      return {
                        id: item.id,
                        countResult: item.count
                      };
                    });
                console.log(data[0].countResult)
                res.render('project', {
                  title: "CCD | PROJECT",
                  userData: req.session.userId,
                  projData: dataProj,
                  locations: data
                });
              })
          })

        }
      })
  })
});

router.get('/project/add', redirectLogin, function (req, res, next) {
  res.render('project_add', {
    title: "CCD | ADD PROJECT",
    userData: req.session.userId
  })
})


router.get("/project/edit/:id", redirectLogin, function (req, res, next) {
  var projectid = req.params.id;
  sequelize.sync().then(function () {
    return db.project
      .findOne({
        where: {
          'id': projectid
        }
      }, {
        include: [{
            model: db.user,
            as: 'user'
          },
          {
            model: db.status,
            as: 'status'
          }
        ]
      }).then(function (data) {
        if (!data) {
          req.flash('danger', errors)
        } else {
          res.render('project_edit', {
            title: "CCD | EDIT PROJECT",
            userData: req.session.userId,
            projectData: data
          })
        }
      })
  })
})

router.post('/project/edit/:id', redirectLogin, function (req, res, next) {
  var Projectname = req.body.project_name;
  var statusid = req.body.status_number;
  sequelize.sync().then(function () {
    return db.project
      .findByPk(req.params.id, {
        include: [{
            model: db.user,
            as: 'user'
          },
          {
            model: db.status,
            as: 'status'
          }
        ]
      }).then(function (data) {
        if (data) {
          return db.project
            .update({
              projectName: Projectname,
              statusId: statusid
            }, {
              where: {
                'id': data.id
              }
            }, {
              include: [{
                  model: db.user,
                  as: 'user'
                },
                {
                  model: db.status,
                  as: 'status'
                }
              ]
            }).then(function (dataz) {
              res.redirect('/project')
            })
        }
      })
  })
})

router.post('/locationadd', redirectLogin, function (req, res, next) {
  var locationName = req.body.location_name;
  var projectId = req.body.projectSelect;
  sequelize.sync().then(function () {
    return db.location
      .create({
        locationName: locationName,
        projectId: projectId
      }, {
        include: [{
          model: db.project,
          as: 'project'
        }]
      }).then(function (locationData) {
        if (!locationData) {
          req.flash('danger', 'Cant Add location')
        } else {
          req.flash('success', 'Location Added Successfully')
          res.redirect('/location')
        }
      })
  })
})

router.get('/location', redirectLogin, function (req, res, next) {
  sequelize.sync().then(function () {
    return db.location
      .findAll({
        include: [{
          model: db.project,
          as: 'project'
        }]
      }).then(function (locationData) {
        if (!locationData) {

        } else {
          res.render('location', {
            title: "CCD | LOCATION",
            userData: req.session.userId,
            ld: locationData
          })
        }

      })
  })
})

router.get('/location/add', redirectLogin, function (req, res, next) {
  sequelize.sync().then(function () {
    return db.project
      .findAll().then(function (projData) {
        res.render('location_add', {
          title: "CCD | LOACTION ADD",
          userData: req.session.userId,
          pjData: projData
        })
      })
  })
})

router.get('/location/edit', redirectLogin, function (req, res, next) {
  res.render('location_edit', {
    title: "CCD | EDIT LOCATION",
    userData: req.session.userId
  })
})

router.get('/block', redirectLogin, function (req, res, next) {
  res.render('block', {
    title: "CCD | BLOCK",
    userData: req.session.userId
  })
})

router.get('/block/add', redirectLogin, function (req, res, next) {
  res.render('block_add', {
    title: "CCD | ADD BLOCK",
    userData: req.session.userId
  })
})

router.get('/block/edit', redirectLogin, function (req, res, next) {
  res.render('block_edit', {
    title: "CCD | EDIT BLOCK",
    userData: req.session.userId
  })
})

router.get('/plot', redirectLogin, function (req, res, next) {
  res.render('plot', {
    title: "CCD | PLOT",
    userData: req.session.userId
  })
})

router.get('/plot/add', redirectLogin, function (req, res, next) {
  res.render('plot_add', {
    title: "CCD | ADD PLOT",
    userData: req.session.userId
  })
})

router.get('/plot/edit', redirectLogin, function (req, res, next) {
  res.render('plot_edit', {
    title: "CCD | EDIT PLOT",
    userData: req.session.userId
  })
})

router.get('/allocation', redirectLogin, function (req, res, next) {
  res.render('allocation', {
    title: "CCD | ALLOCATION",
    userData: req.session.userId
  })
})

router.get('/allocation/add', redirectLogin, function (req, res, next) {
  res.render('new_allocation', {
    title: "CCD | NEW ALLOCATION",
    userData: req.session.userId
  })
})

router.get('/user', redirectLogin, function (req, res, next) {
  res.render('user', {
    title: "CCD | USERS",
    userData: req.session.userId
  })
})

router.get('/user/add', redirectLogin, function (req, res, next) {
  res.render('user_add', {
    title: "CCD | ADD USER",
    userData: req.session.userId
  })
})

router.get('/user/edit', redirectLogin, function (req, res, next) {
  res.render('user_edit', {
    title: "CCD | EDIT USER",
    userData: req.session.userId
  })
})

router.get('/user/change-password', redirectLogin, function (req, res, next) {
  res.render('user_password', {
    title: "CCD | USERS",
    userData: req.session.userId
  })
})

module.exports = router;