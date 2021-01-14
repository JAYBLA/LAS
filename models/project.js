'use strict';

module.exports = function(sequelize, DataTypes){
  const project = sequelize.define('project', {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{})
  project.associate = function(models){
    project.belongsTo(models.user, {
      foreignKey: 'userId'
    })
    project.belongsTo(models.status, {
      foreignKey: 'statusId'
    })
    project.hasMany(models.location)
  }
  return project;
};