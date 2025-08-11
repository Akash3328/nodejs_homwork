const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth.js"); // Import authentication middleware
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js"); // Import the connection request model

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log(req.user);
  res.send(req.user.firstName + " sent a connection request to you");
});

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const fromUserId = loggedInUser._id;
      const status = req.params.status;
      const toUserId = req.params.toUserId;
      const allowedStatuses = ["interested", "ignored"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      // check if the user send request to same user second time
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: touserId },
          { fromUserId: toUserId, toUserId: fromuserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({
          error: "Connection request already exists between these users",
        });
      }
      // Check if the user is trying to send a request to themselves
      // if (fromuserId.toString() === touserId) {
      //   res.json({
      //     message: "You cannot send a connection request to yourself",
      //   });
      // }

       const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

     
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " sent a "+status +"connection request to you",
        data,
      });
    } catch (err) {
      res.status(500).send("something went wrong", err.message);
    }
  }
);

requestRouter.post(
  "/request/:review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatuses = ["accept", "reject"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        touserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ error: "Connection request not found or already processed" });
      }

      connectionRequest.status = status === "accept" ? "accepted" : "rejected";
      const updatedRequest = await connectionRequest.save();

      res.json({
        message: `Connection request ${connectionRequest.status} successfully`,
        data: updatedRequest,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = requestRouter;
