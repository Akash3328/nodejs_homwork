const mongoose = require("mongoose");
// add all apropriate validation in schema and also add default values if needed
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,

      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v); // Only letters allowed
        },
        message: (props) => `${props.value} is not a valid first name!`,
      },
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v); // Only letters allowed
        },
        message: (props) => `${props.value} is not a valid last name!`,
      },
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true, // Convert email to lowercase
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v); // At least one uppercase, one lowercase, and one digit
        },
        message: (props) =>
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
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
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v); // Accepts any http/https URL
        },
        message: (props) => `${props.value} is not a valid photo URL!`,
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
      validate: {
        validator: function (v) {
          return v.length <= 10; // Limit to a maximum of 10 skills
        },
        message: "You can only add up to 10 skills.",
      },
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
