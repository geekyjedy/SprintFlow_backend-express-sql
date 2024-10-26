const express = require('express');
const Manager = require('../models/Managers'); 
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const manager = new Manager(req.body);
    await manager.save();
    res.status(201).send(manager);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add more routes (GET, PUT, DELETE) as needed

module.exports = router;
