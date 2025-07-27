const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();

const User = require("./models/user.js"); // Import the User model

app.post("/signup", async (req, res) => {
  const user = new User ({
    firstName: "rahul",
    lastName: "chavada",
    emailId: "sahul@chavada.com",
    password: "rahul1234",
    age: 18,
  }); // Create a new user instance with sample data

  try{
  await user.save();
  res.send("user added successfully ");
  }catch (err) {
    res.status(400).send(err.message); // Send validation error message
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
