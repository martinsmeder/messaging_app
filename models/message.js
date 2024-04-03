// Import mongoose
const mongoose = require("mongoose");

// Define the message schema
const messageSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
