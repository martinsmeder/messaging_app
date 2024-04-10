const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Home page.
exports.index = asyncHandler(async (req, res, next) => {
  // Retrieve the message from the query parameters
  const message = req.query.message;

  // Render the homepage template with the message
  res.render("index", { message });
});

// List of conversations for currently logged in user.
exports.conversation_list = asyncHandler(async (req, res, next) => {
  try {
    // Fetch conversations involving the currently logged-in user
    const conversations = await Message.find({
      $or: [{ sender: req.user._id }, { recipient: req.user._id }],
    })
      .populate("sender", "username")
      .populate("recipient", "username");

    // Create a set to store unique user pairs
    const uniqueConversations = new Set();

    // Filter conversations to ensure uniqueness based on participants
    const processedConversations = conversations.filter((conversation) => {
      // Determine the other user in the conversation
      const otherUser =
        // If the current user is the sender, the other user is the recipient
        conversation.sender._id.toString() === req.user._id.toString()
          ? conversation.recipient
          : // If the current user is the recipient, the other user is the sender
            conversation.sender;

      // Create a unique key for the conversation based on user IDs, sorted alphabetically
      const key = [otherUser._id, req.user._id].sort().join("-");

      // Check if this conversation has already been processed
      if (!uniqueConversations.has(key)) {
        // If not, add the conversation key to the set of unique conversations
        uniqueConversations.add(key);
        // Return true to include this conversation in the filtered list
        return true;
      }

      // If the conversation is already in the set, return false to exclude it from the filtered list
      return false;
    });

    // Render processed list of conversations
    res.render("conversation_list", {
      title: "Conversations",
      conversations: processedConversations,
    });
  } catch (err) {
    console.error("Error fetching conversation list:", err);
    // Pass the error to the error handling middleware
    next(err);
  }
});

// Display list of all Messages in a specific conversation.
exports.message_list = asyncHandler(async (req, res, next) => {
  try {
    // Get the conversationId from URL parameter
    const conversationId = req.params.id;

    // Fetch messages belonging to the specified conversationId
    const messages = await Message.find({ conversationId })
      .populate("sender", "username")
      .populate("recipient", "username");

    res.render("message_list", {
      title: "Messages",
      messages: messages,
    });
  } catch (err) {
    console.error("Error fetching message list:", err);
    // Pass the error to the error handling middleware
    next(err);
  }
});

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  try {
    // Check if conversationId is provided in the URL
    if (req.params.id) {
      // Get the conversationId from URL parameter
      const conversationId = req.params.id;
      if (!conversationId) {
        // Handle scenario where conversation is not found
        return res.status(404).send("Conversation not found");
      }

      // Render the form for adding a message to an existing conversation
      res.render("message_create_existing", {
        title: "Add Message to Conversation",
        conversation: conversationId,
      });
    } else {
      // Render the form for creating a new message
      res.render("message_create_new", { title: "Create New Message" });
    }
  } catch (err) {
    console.error("Error creating or adding message:", err);
    // Pass the error to the error handling middleware
    next(err);
  }
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
