#! /usr/bin/env node
// "Shebang" to ensure that the script will be interpreted using the Node.js interpreter
// Run the script: node populatedb <your MongoDB connection string>

// Get and store command-line arguments passed to the script, excluding the first
// two elements (Node.js executable and script path)
const userArgs = process.argv.slice(2);

// Get models
const User = require("./models/user");
const Message = require("./models/message");

// Import the Mongoose library
const mongoose = require("mongoose");

// Disable strict mode to allow for more flexible queries
mongoose.set("strictQuery", false);

// Retrieve the MongoDB connection string from command-line arguments
const mongoDB = userArgs[0];

// Define the main function
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB); // Connect to database using connection string
  console.log("Debug: Should be connected?");
  const createdUsers = await createUsers(); // Create users
  await createMessages(createdUsers); // Create messages
  console.log("Debug: Closing mongoose");
  mongoose.connection.close(); // Close the connection
}

// Define functions to create users and messages
async function userCreate(username, email, password) {
  const newUser = new User({
    username,
    email,
    password,
  });
  await newUser.save(); // Insert new document
  console.log(`Added user: ${username}`);
  return newUser;
}

async function messageCreate(sender, recipient, content, conversationId) {
  const newMessage = new Message({
    sender,
    recipient,
    content,
    conversationId,
  });
  await newMessage.save(); // Insert new document
  console.log(`Added message: ${content}`);
  return newMessage;
}

// Call functions to create users and messages
async function createUsers() {
  const createdUsers = await Promise.all([
    userCreate("john_doe", "john@example.com", "password123"),
    userCreate("jane_smith", "jane@example.com", "password456"),
  ]);
  return createdUsers;
}

async function createMessages(users) {
  const conversationId = "507f1f77bcf86cd799439012";
  const createdMessages = await Promise.all([
    messageCreate(users[0]._id, users[1]._id, "Hello, world!", conversationId),
    messageCreate(
      users[1]._id,
      users[0]._id,
      "This is a test message.",
      conversationId
    ),
  ]);
  return createdMessages;
}

// Start the main function
main().catch((err) => console.log(err));
