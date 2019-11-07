var express = require('express'),
	app = express(),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	ent = require('ent');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var cptId=0;
var myClient={'pseudo' : '', 'id' : 0 };
var todoList=['manger','boire'];
var clients=new Array;

server.listen(8080);

//***********************************************************************************************************************************
//***********************************************************************************************************************************

app.use(session({ secret: 'todotopsecret' }))
//console.log(__dirname);
	.use('/public', express.static('public'))

	.get('/', function (req, res) {
		res.render(__dirname + '/login.ejs');
	})
	.get('/index', function (req, res) {
		res.render(__dirname + '/index.ejs');
	})
	.post('/cv', urlencodedParser, function (req, res) {
		res.render(__dirname + '/index.ejs');
	});

//************************************************************************************************************************************
//************************************************************************************************************************************


io.sockets.on('connection', function (socket) {
	socket.on('nouveau_client', function(data) {
		myClient.id= cptId;
		cptId++;
		myClient.pseudo=data.pseudo;
		clients[myClient.id]=myClient.pseudo;
		console.log(clients);
	})
	.on('connexionChat', function (){
		console.log('connexion chat....');
		console.log ('client test : ' + JSON.stringify(myClient));
		socket.emit('identification',myClient,todoList);
		socket.broadcast.emit('entree', myClient);
	})
	.on('message', function (message,data) {
		console.log ('message envoyé par : ' + JSON.stringify(data));
		socket.broadcast.emit('messageEmi',message, data);
	})
	.on('newtodo', function(newtodo){
		todoList.push(newtodo);
		socket.emit('updateList',todoList);
		socket.broadcast.emit('updateList',todoList);
	})
	.on('suptodo', function(index){
		todoList.splice(index, 1);
		socket.emit('updateList',todoList);
		socket.broadcast.emit('updateList',todoList);
	})
});
