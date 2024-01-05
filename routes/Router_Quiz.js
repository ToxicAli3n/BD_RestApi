const express = require("express");
const controller = require("../controllers/Quiz");
const router = express.Router();

router.route("/Quiz").get(controller.getAllQuiz).post(controller.createQuiz);
router.route("/Quiz/:id").get(controller.getQuizById).put(controller.updateQuiz).delete(controller.deleteQuiz);

module.exports = router;