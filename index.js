var express = require('express');
var bodyParser =require('body-parser');
var got = require('got');
var ImagesClient = require('google-images');
var db = require('./db.js');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

var client = new ImagesClient('004956161543187475116:prc_nqcswm0', 'AIzaSyCzQPFwvyMHoVKnsdZrRNEHx-lxyshXWrQ');

app.get('/api/img/:term',function (req,res) {
	var term = req.params.term;
	db.img.create({
		term: term
	});
	client.search(term)
	    .then(function (images) {
	    	res.send(images);
	    });
});
app.get('/api/latest/imgsearch', function (req, res) {
	db.img.findAll({
  		attributes: ['term', 'createdAt']
	}).then(function (imgs) {
		if(imgs){
			res.send(imgs);
		}else{
			res.status(404).send();
		}
	}).catch(function (e) {
		res.status(500).send();
	});
})
app.use(express.static(__dirname + '/public'));

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log('Express Started on port ' + PORT);
	});	
});

