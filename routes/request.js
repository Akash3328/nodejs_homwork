const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth.js'); // Import authentication middleware
const User = require('../models/user.js');



requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
   console.log(req.user);
  res.send(req.user.firstName +" sent a connection request to you");
});


module.exports = requestRouter;