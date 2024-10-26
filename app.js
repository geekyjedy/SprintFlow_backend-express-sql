const express = require('express');
const { dbConnectionString, connectDB } = require('./src/connection/db');
const authRoutes = require('./src/routes/auth');
const managerRoutes = require('./src/routes/managerRoutes');
const projectRoutes = require('./src/routes/projectsRoutes');


const Projects = require('./src/models/Projects');
const Managers = require('./src/models//Managers');
const Employees = require('./src/models/Employees');

// centralized syncing models relationship
Managers.associate(dbConnectionString.models);
Projects.associate(dbConnectionString.models);
Employees.associate(dbConnectionString.models);

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/project', projectRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB().then(() => {
        dbConnectionString.sync()
            .then(() => console.log('All models synchronized successfully'))
            .catch((err) => console.error('Error synchronizing models:', err));
    });
    console.log(`Server is running on port ${PORT}`);
});


