const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Home page: Display list of all conversations (list of unique users a user has messaged).
exports.index = asyncHandler(async (req, res, next) => {
  // Retrieve the message from the query parameters
  const message = req.query.message;

  // Render the homepage template with the message
  res.render("index", { message });
});

// List of all messages.
exports.all_messages_list = asyncHandler(async (req, res, next) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    res.render("all_messages_list", {
      title: "All Messages",
      messages: messages,
    });
  } catch (err) {
    console.error("Error fetching message list:", err);
    // Pass the error to the error handling middleware
    next(err);
  }
});

// Display list of all Messages between two users.
exports.message_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: List of messages from specific conversation");
});

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message create GET");
});

// Handle Message create on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message create POST");
});

// Display Message delete form on GET.
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message delete GET");
});

// Handle Message delete on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message delete POST");
});

// Display Message update form on GET.
exports.message_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message update GET");
});

// Handle Message update on POST.
exports.message_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message update POST");
});
