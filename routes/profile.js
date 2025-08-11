const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js"); // Import authentication middleware
const User = require("../models/user.js");
const {validateEditProfileData} = require("../utils/validation.js");

profileRouter.get("/profile/view", userAuth,async (req, res) => {
  
   const { user } = req; // Get the authenticated user from the request object
  try {
    res.send(req.user); // Send the authenticated user's data
    // You can also render a profile page or return user details as needed

    res.send("user profile page");
  } catch (err) { 
    res.status(500).send("something went wrong", err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try{
  if(!validateEditProfileData(req)){
     throw new Error("invalid edit request");
  } // Validate the incoming data
    const loggedInUser = req.user;
  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  await  loggedInUser.save();
  
  
  res.send('${loggedInUser.firstName} ,your profile updated succesfully');
    
    
  }catch(err){
    res.status(400).send("invalid request");
  }
});


module.exports = profileRouter;