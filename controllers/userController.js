const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User detail");
});

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("signup_form", { title: "Sign up" });
});

// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
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

// Display User delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete GET");
});

// Handle User delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete POST");
});

// Display User update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update GET");
});

// Handle User update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update POST");
});

// Display User signup form on GET.
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User signup GET");
});

// Handle User signup on POST.
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User signup POST");
});

// Display User login form on GET.
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User login GET");
});

// Handle User login on POST.
exports.user_login_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User login POST");
});
