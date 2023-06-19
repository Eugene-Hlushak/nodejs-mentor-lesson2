const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  userRefresh,
} = require("../../controlers/users-controllers");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.post("/logout", authenticate, userLogout);
router.get("/current", authenticate, userRefresh);
router.get("/user", authenticate, userRefresh);

module.exports = router;
