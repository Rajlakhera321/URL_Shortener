const controller = require("../controller/user");
const express = require("express");
const router = express.Router();

router.post("/users", controller.addUser);

router.put("/users/:userId", controller.updateUser);

router.get("/users", controller.getData);

router.get("/users/:userId", controller.getDataById);

router.delete("/users/:userId", controller.deleteRecord);

module.exports = router;
