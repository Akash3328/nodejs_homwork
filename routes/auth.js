const express = require("express");
const authRouter = express.Router();



authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).send("invalid email ");
    }
    const ispasswordValid = await user.validatePassword(password)
    if (ispasswordValid) {
      const token = await user.getJwt(); // Generate JWT token
      res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
      return res.send("login successfull !!");
     
    } else {
      return res.status(401).send("invalid email or password");
    }
  } catch (err) {
    res.status(500).send(`something went wrong: ${err.message}`);
  }
});

module.exports = authrouter;