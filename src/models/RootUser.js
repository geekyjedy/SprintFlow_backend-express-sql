// user.js
const { DataTypes } = require('sequelize');
const { dbConnectionString } = require('../connection/db'); 

const User = dbConnectionString.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'RootUsers',
});



module.exports = User;
