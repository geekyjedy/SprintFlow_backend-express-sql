const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/RootUser'); 

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET; 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Uncomment if using bcrypt
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid email or password' });
    // }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }


    const access = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    const refresh= jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET);

    // if want to save the refresh token in the database for future reference
    // user.refreshToken = refreshToken;
    // await user.save();

    res.json({
      message: 'Login successful',
      access,
      refresh,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// app.post('/managers', async (req, res) => {
//   const manager = new Managers(req.body);
//   await manager.save();
//   res.status(201).send(manager);
// });


module.exports = router;
