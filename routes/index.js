const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// =============================== MESSAGE ROUTES ===============================
router.get("/", message_controller.index);
router.get("/conversation/:id/messages", message_controller.message_list);
router.get(
  "/conversation/:id/message/create",
  message_controller.message_create_get
);
router.post(
  "/conversation/:id/message/create",
  message_controller.message_create_post
);
router.get(
  "/conversation/:id/message/:id/delete",
  message_controller.message_delete_get
);
router.post(
  "/conversation/:id/message/:id/delete",
  message_controller.message_delete_post
);
router.get(
  "/conversation/:id/message/:id/update",
  message_controller.message_update_get
);
router.post(
  "/conversation/:id/message/:id/update",
  message_controller.message_update_post
);

// =============================== USER ROUTES ===============================
router.get("/user/:id/detail", user_controller.user_detail);
router.get("/user/create", user_controller.user_create_get);
router.post("/user/create", user_controller.user_create_post);
router.get("/user/:id/delete", user_controller.user_delete_get);
router.post("/user/:id/delete", user_controller.user_delete_post);
router.get("/user/:id/update", user_controller.user_update_get);
router.post("/user/:id/update", user_controller.user_update_post);
router.get("/signup", user_controller.user_signup_get);
router.post("/signup", user_controller.user_signup_post);
router.get("/login", user_controller.user_login_get);
router.post("/login", user_controller.user_login_post);

module.exports = router;
