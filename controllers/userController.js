const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcrypt");

// User list (temporary).
exports.user_list = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.render("user_list", {
      title: "User List",
      users: users,
    });
  } catch (err) {
    console.error("Error fetching user list:", err);
    // Pass the error to the error handling middleware
    next(err);
  }
});

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("user_detail", { title: "User Profile", user });
  } catch (err) {
    return next(err);
  }
});

// Display User signup form on GET.
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup_form", { title: "Sign up" });
});

// Handle User signup on POST.
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  // Sanitize and validate user input using Express-validator
  await body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified.")
    .run(req);

  await body("email")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Email must be specified.")
    .run(req);

  await body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long.")
    .run(req);

  await body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
    .withMessage("Passwords do not match.")
    .run(req);

  // Extract validation errors from request
  const errors = validationResult(req);

  // If there are errors, render the form again with error messages
  if (!errors.isEmpty()) {
    return res.render("signup_form", {
      title: "Sign Up",
      errors: errors.array(),
    });
  }

  // Hash the password using bcrypt (10 is the saltRounds parameter)
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user instance with sanitized data and hashed password
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, // Save hashed password to the database
  });

  try {
    // Save the user to the database
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    // Handle database errors
    return next(err);
  }
});

// Display User login form on GET.
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login_form", { title: "Login" });
});

// Handle User login on POST.
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

// Handle User logout on GET.
exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout(() => {
    // Log out user (callback required)
    res.redirect("/"); // Redirect to the home page after logout
  });
});

// Display User update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // Assuming user is authenticated
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.render("user_update_form", { title: "Update Profile", user });
  } catch (err) {
    return next(err);
  }
});

// Handle User update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  try {
    // Extract email and passwords from request body
    const { email, oldPassword, newPassword } = req.body;

    // Validate old password
    const user = await User.findById(req.user._id); // Assuming user is authenticated
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).render("user_update_form", {
        title: "Update Profile",
        user,
        error: "Old password is incorrect",
      });
    }

    // Validate and hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user document
    user.email = email;
    user.password = hashedNewPassword;
    await user.save();

    res.redirect("/user/detail");
  } catch (err) {
    return next(err);
  }
});

// Display User delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  // Render a confirmation page
  res.render("user_delete_confirmation", { title: "Delete User" });
});

// Handle User delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  // Find and delete user
  await User.findByIdAndDelete(req.user._id);

  // Redirect to homepage with success message
  res.redirect("/?message=User%20deleted%20successfully");
});
