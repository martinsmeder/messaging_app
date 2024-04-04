// Import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a method to validate the user's password
userSchema.methods.validPassword = async function (password) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // Handle error, such as logging or returning false
    console.error("Error validating password:", error);
    return false;
  }
};

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
