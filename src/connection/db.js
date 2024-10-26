const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConnectionString = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
});

// db connection
const connectDB = async () => {
    try {
        await dbConnectionString.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = { dbConnectionString, connectDB };
