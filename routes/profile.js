const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js"); // Import authentication middleware
const User = require("../models/user.js");


profileRouter.get("/profile", userAuth,async (req, res) => {
  
   const { user } = req; // Get the authenticated user from the request object
  try {
    res.send(req.user); // Send the authenticated user's data
    // You can also render a profile page or return user details as needed

    res.send("user profile page");
  } catch (err) { 
    res.status(500).send("something went wrong", err.message);
  }
});


module.exports = profileRouter;