const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();

const User = require("./models/user.js"); // Import the User model
app.use(express.json());

// add new user data throw postmen body
const duser = require("./models/user.js"); // Import the User model

app.post("/signup", async (req, res) => {
  const duser = new User(req.body); // Create a new user instance with sample data

  try{
  await duser.save();
  res.send("user added successfully ");
  }catch (err) {
    res.status(400).send(err.message); // Send validation error message
  } 
});


// get user by emailId
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
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send({ users });
//   } catch (err) {
//     res.status(500).send("Error fetching users", err);
//   }
// });

app.get("/feed", async (req,res) => {
     const useremail = res.body.emailId;
    try{
      const userone = await User.findOne({emailId : useremail});
      res.send({userone});
         
    }
    catch(err){
      res.status(500).send("error fatching users",err);
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
