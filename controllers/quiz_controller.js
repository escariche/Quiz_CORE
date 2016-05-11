//quiz_controller

var models = require('../models');

//GET /quizes/question
exports.question = function(req, res, next){

models
.Quiz
.findOne()//busca la 1ª pregunta
.then(function(quiz){
	if(quiz){
		var answer = req.query.answer || '';
		res.render('quizes/question', {question: 'Capital de Italia', answer: answer});	
	}else{
		throw new Error('No hay preguntas en la DB');
	}
}).catch(function (error){next(error);});
};

//GET /quizes/answer

exports.check = function(req,res, next){

models
.Quiz
.findOne()//busca la 1ª pregunta
.then(function(quiz){
	if(quiz){
		var answer = req.query.answer || "";

	var result = req.query.answer === 'Roma' ? 'Correcta' : 'Incorrecta';
	res.render('quizes/result', {result: result, answer: answer});
	}else{
		throw new Error('No hay preguntas en la DB');
	}
}).catch(function (error){next(error);});

	
};