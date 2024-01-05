const express = require("express");
const controller = require("../controllers/Users");
const userRouter = express.Router();

userRouter.route("/User").get(controller.getAllUsers).post(controller.createUser);
userRouter.route("/User/:id").get(controller.getUserById).put(controller.updateUser).delete(controller.deleteUser);

module.exports = userRouter;