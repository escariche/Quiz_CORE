var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/check', quizController.check);

module.exports = router;
