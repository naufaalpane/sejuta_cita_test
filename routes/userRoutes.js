const userController = require("../controller/userController");

const { Router } = require("express");

const router = Router();

router.post("/login", userController.USER_LOGIN);
router.post("/refresh", userController.USER_REFRESH);

module.exports = router;
