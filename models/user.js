'use strict';

module.exports = function(sequelize, DataTypes){
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{})
  user.associate = function(models){
    models.user.belongsTo(models.status, {
      foreignKey: 'statusId',
      as: 'status'
    })
    user.hasMany(models.project)
  }
  return user;
};
