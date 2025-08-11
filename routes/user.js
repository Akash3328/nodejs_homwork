const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth.js"); // Import authentication middleware
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js"); // Import the connection request model


const USER_SAFA_DATA = "firstName lastName skills profilePicture";

// get all pending connection requests for the logged-in user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await connectionRequest
      .find({
        touserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFA_DATA); // Populate the fromUserId field with user details
    res.status(200).send(receivedRequests);
    res.status(200).send(receivedRequests);
  } catch (err) {
    res.status(400).send("something went wrong", err.message);
  }
});

userRouter.get("/user/conections", userAuth, async (req, res) => {
  try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {touserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ],
        }).populate("fromUserId", USER_SAFA_DATA);
    const data =  connectionRequests.map((request) => {
    res.json({data});
} catch (err) {
    res.status(500).send("something went wrong", err.message);
  }
});

module.exports = userRouter;
