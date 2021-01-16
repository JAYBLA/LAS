'use strict';

module.exports = function(sequelize, DataTypes){
  const status = sequelize.define('status', {
    statusName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{})
  status.associate = function(models) {
    models.status.hasMany(models.user, {
      as: 'statusId'
    })
    status.hasMany(models.project)
    status.hasMany(models.plot)
  }
  return status;
};