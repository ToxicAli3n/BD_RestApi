const express = require("express");
const controller = require("../controllers/Role");
const roleRouter = express.Router();

roleRouter.route("/Role").get(controller.getAllRole).post(controller.createRole);
roleRouter.route("/Role/:id").get(controller.getRoleById).put(controller.updateRole).delete(controller.deleteRole);

module.exports = roleRouter;