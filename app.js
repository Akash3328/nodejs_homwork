const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();

const User = require("./models/user.js"); // Import the User model
app.use(express.json());

// Endpoint to create a new user
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("No users found with the provided email ID");
    } else {
      return res.send(users);
    }
  } catch (err) {
    res.status(404).send("something want wrong", err);
  }
});
// Endpoint to fetch all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({users});
  } catch (err) {
    res.status(500).send("Error fetching users", err);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
