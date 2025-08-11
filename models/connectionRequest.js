const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    //   ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    //   ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "accepted", "rejected", "ignored"],
        message: "{VALUE} is not a valid status",
      
      },
    },
  },
  {
    timestamps: true, // this will add createdAt and updatedAt fields to the schema
  }
);
// better then direct equal in request js file
  connectionRequestSchema.pre("save", function (next) {
       const connectionRequest = this;
       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
           return next(new Error("User cannot send request to himself"));
       }
    next();
  });

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;
