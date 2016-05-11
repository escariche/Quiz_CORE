var path = require('path');

//Cargar modelo ORM
var Sequelize = require('Sequelize');

//Usar DB SQLite
var sequelize = new Sequelize(null, null. null,
	{dialect: "sqlite", storage: "quiz.sqlite"});

var url, storage;
if(!process.env.DATABASE_URL){
	url= "sqlite:///";
}else{
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, {storage: storage, omitNull :true});
//Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//sequelize.sync() crea e inicializa tabla de prevuntas en DB
sequelize
.sync()
.then(function(){//sync() crea la tabla quiz
	return
	Quiz
	.count()
	.then(function(c){
		if (c === 0){//la tabla se inicializa si etá vacía
			return
			Quiz
			.create({question:'Capital de Italia', answer: 'Roma'})
			.then(function(){
				console.log('DB inicializada con datos');
			});
		}
	});
}).catch(function(error){
	console.log("Error sincronizandolas tablas de la DB:", error);
	process.exit(1);
});

exports.Quiz = Quiz; //exporat la definicion de Quiz