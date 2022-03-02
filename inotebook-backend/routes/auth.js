const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

// secret code fior JWT
const JWT_SECRET = 'i@Notebook$$$';

// Route 1: Create a User using: POST "/api/auth/". Login not required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // if there are errors then return bad request and the errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({ success, error: 'Sorry, user with this email already exists.' })
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });

    // creating json web token
    const data = {
      user: { id: user.id }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    return res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error Occured');
  }
})

// Route 2: Authorize a user : POST "/api/auth/login". Log in not required
router.post('/login', [
  body('email', 'Enter a valid email.').isEmail(),
  body('password', 'Password cannot be blank.').exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: 'Please try to login using correct credentials.' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: 'Please try to login using correct credentials.' });
    }

    // creating json web token
    const data = {
      user: { id: user.id }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error Occured');
  }

});

// Route 3: Get logged in user details using: POST "api/auth/getuser" . Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    return res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error Occured');
  }
});





module.exports = router