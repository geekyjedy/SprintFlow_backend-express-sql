const express = require('express');
const Project = require('../models/Projects'); 
const router = express.Router();

// create a new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('projectManager').populate('employees');
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a specific project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('projectManager').populate('employees');
    if (!project) {
      return res.status(404).send();
    }
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update a project
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).send();
    }
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
