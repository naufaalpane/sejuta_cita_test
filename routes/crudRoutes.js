const crudController = require("../controller/crudController");
const userMiddleware = require("../middleware/userMiddleware");
const crudMiddleware = require("../middleware/crudMiddleware");

const { Router } = require("express");

const router = Router();

router.get("/list", userMiddleware, crudController.LIST);
router.post("/create", userMiddleware, crudMiddleware, crudController.CREATE);
router.put("/edit/:id", userMiddleware, crudMiddleware, crudController.EDIT);
router.delete("/delete/:id", userMiddleware, crudMiddleware, crudController.DELETE);

module.exports = router;
