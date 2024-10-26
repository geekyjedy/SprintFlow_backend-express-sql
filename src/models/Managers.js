const { DataTypes } = require('sequelize');
const { dbConnectionString } = require('../connection/db');

const Managers = dbConnectionString.define('Managers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Managers.associate = (models) => {
  Managers.hasMany(models.Projects, {
        foreignKey: 'managerId',
        as: 'projects',
    });
};

module.exports = Managers;
