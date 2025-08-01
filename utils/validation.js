const  validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, gender, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("please enter name :");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email id :");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password :");
  } else if (!age || !Number.isInteger(age) || age < 18 || age > 120) {
    throw new Error("please enter valid age :");
  } else if (!["male", "female", "other"].includes(gender)) {
    throw new Error("please enter valid gender :");
  }
};

module.exports = {
  validateSignUpData: validateSignUpData,
};
