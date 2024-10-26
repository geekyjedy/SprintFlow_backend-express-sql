  const { DataTypes } = require('sequelize');
  const { dbConnectionString } = require('../connection/db');


const Projects = dbConnectionString.define('Projects', {
    projectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectBudget: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectManagerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Managers',
            key: 'id'
        }
    },
    projectDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

Projects.associate = (models) => {
  Projects.belongsTo(models.Managers, {
    foreignKey: 'projectManagerId',
    as: 'manager'  
  });
  Projects.belongsToMany(models.Employees, {
        through: 'ProjectEmployees',
        foreignKey: 'projectId',
        otherKey: 'employeeId',
        as: 'employees'
    });
};


module.exports =  Projects;
