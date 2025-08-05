const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// add all apropriate validation in schema and also add default values if needed
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,

      trim: true,
      validate(value) {
        if (!validator.isAlpha(value, "en-US", { ignore: " " })) {
          throw new Error("First name must contain only letters and spaces");
        }
      },
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value, "en-US", { ignore: " " })) {
          throw new Error("Last name must contain only letters and spaces");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true, // Convert email to lowercase
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 6,
          })
        ) {
          throw new Error(
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
          );
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
      validate: {
        validator: function (v) {
          return Number.isInteger(v); // Age must be an integer
        },
        message: (props) => `${props.value} is not a valid age!`,
      },
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new console.error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
      default: function () {
        if (this.gender && this.gender.toLowerCase() === "female") {
          return "https://img.freepik.com/free-vector/woman-with-braided-hair-illustration_1308-174675.jpg?semt=ais_hybrid&w=740&q=80"; // Default female image
        } else if (this.gender && this.gender.toLowerCase() === "male") {
          return "https://avatars.githubusercontent.com/u/30511472?v=4"; // Default male image
        } else {
          return "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"; // Default image for other
        }
      },
    },

    about: {
      type: String,
      maxlength: 500, // Limit the length of the about section
      trim: true,
      default: "No information provided",
    },
    skills: {
      type: [String], // Array of strings for skills

      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "meet_dev", {
    expiresIn: "7d", // Token expires in 7 days
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByuser) {
  const user = this;
  const passwordHash = user.password;

  const ispasswordValid = await bcrypt.compare(
    passwordInputByuser,
    passwordHash
  );
  return ispasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
