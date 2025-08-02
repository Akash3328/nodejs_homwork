const express = require("express");
const connectDB = require("./config/database.js"); // Import the database connection
const app = express();

const User = require("./models/user.js"); // Import the User model
const { validateSignUpData } = require("./utils/validation.js"); // Import validation function
const bcrypt = require("bcrypt");
app.use(express.json());
// user signup endpoint
app.post("/signup", async (req, res) => {
  try {
    // Validate the incoming data
    validateSignUpData(req);

    // encrypt password
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(
      {
        firstName,
        lastName,
        emailId,
        password: passwordHash, // Store the hashed password
        age,
        gender,
      }
      //
    ); // Create a new user instance with sample data
    await user.save();
    res.send("user added successfully ");
  } catch (err) {
    res.status(400).send(err.message); // Send validation error message
  }
});

// user login endpoint
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // validate emailid
    // if (validate.isvalidEmail(emailId) === false) {
    //   return res.status(400).send("Invalid email format");
    // }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).send("invalid email or password");
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (ispasswordValid) {
      res.send("login successfull !!");
    } else {
      return res.status(404).send("invalid email or password");
    }
  } catch (err) {
    res.status(500).send("something went wrong", err.message);
  }
});
// get user by id

app.get("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findById({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(404).send("user not found", err);
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Error deleting user", err);
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

app.get("/feed", async (req, res) => {
  const useremail = res.body.emailId;
  try {
    const userone = await User.findOne({ emailId: useremail });
    res.send({ userone });
  } catch (err) {
    res.status(500).send("error fatching users", err);
  }
});

// update user by id using patch method
app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const updateData = req.body; // Get the data to update from the request body

  const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age", "id"]; // Define allowed fields for update
  const isUpdateAllowed = Object.keys(updateData).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );
  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid update fields");
  }
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
      runValidators: true, // you have manually write these for validation . not for createing data on crate new data or user
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("User not found", err);
  }
});

// update user by emailId using patch method
app.patch("/users/email", async (req, res) => {
  const userEmail = req.body.emailId;
  const updateData = req.body; // Get the data to update from the request body
  try {
    const user = await User.findOneAndUpdate(
      { emailId: userEmail },
      updateData,
      { returnDocument: "after" }
    );
    if (!user) {
      return res.status(404).send("User not found with the provided email ID");
    }
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Error updating user", err);
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
