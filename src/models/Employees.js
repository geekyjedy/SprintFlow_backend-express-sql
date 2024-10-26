const { DataTypes } = require('sequelize');
const { dbConnectionString } = require('../connection/db'); 

const Employees = dbConnectionString.define('Employees', {
  employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
  },
  salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
  },
  location: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
  },
}, {
  timestamps: true, 
});

Employees.associate = (models) => {
  Employees.belongsToMany(models.Projects, {
    through: 'ProjectEmployees',
    foreignKey: 'employeeId',
    otherKey: 'projectId',
    as: 'projects',
  });
};


module.exports = Employees ;
