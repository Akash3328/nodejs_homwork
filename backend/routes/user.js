const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth.js"); // Import authentication middleware
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js"); // Import the connection request model

const USER_SAFE_DATA = "firstName lastName skills profilePicture";

// get all pending connection requests for the logged-in user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); // Populate the fromUserId field with user details
    res.status(200).send(receivedRequests);
  } catch (err) {
    res.status(400).send("something went wrong", err.message);
  }
});

userRouter.get("/user/conections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { touserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(500).send("something went wrong", err.message);
  }
});

// creating feed api
userRouter.post("/feed",userAuth,async (req, res) => {
 try{
  // dont show logedInUser in feed
  // dont show already connected users in feed
  // dont show users who have sent connection request
  // dont show users who i ignored 
  // 

  const loggedInUser = req.user;
  const connectionRequests = await ConnectionRequest.find({
    $or: [
      {fromUserId: loggedInUser._id  },
      {toUserId: loggedInUser._id }
    ]
  }).select(fromUserId, toUserId ).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

   const hideUersFromFeed =  new Set();
  connectionRequests.forEach((row) => {
    hideUserFromFeed.add(req.fromUserId.toString());
    hideUserFromFeed.add(req.toUserId.toString());
  });
  
  res.send(connectionRequests);
 } catch (err) {
  res.status(500).send("something went wrong", err.message);
 }
});

module.exports = userRouter;
