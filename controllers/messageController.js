const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

// Home page: Display list of all Konversations (list of unique users a user has
// messaged).
exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home page (conversation list)");
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
