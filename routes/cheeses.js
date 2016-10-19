// all the routes for the different cheeses!

var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer'); //this is the form handling middleware!
var uploadPath = path.join(__dirname, '../public/uploads'); // this is the folder where the images are stored I think?
var upload = multer({ dest: uploadPath}); //

var Cheese = require('../models/cheese'); //this connects back to the model cheese.js

router.get('/add', function(req, res) {
	res.render('new-cheese'); // for the add a cheese page render the new-pet stuff
})

// what is this body thing??
router.post('/add', upload.single('image'), function(req, res) {
	var cheese = new Cheese({
		location: location.body.name // how do I incorporate location and coordinates here?
		imageFilename: req.file.filename
	});

cheese.save(function(err, data) {
	if (err) {
		console.log(err);

		return res.redirect(303, '/cheeses'); // if error, return to the main display
	}

	return res.redirect(303, '/cheese'); //if success, return to the main display
	});
});

//router.get('/'), function(req, res) { //WHAT DOES THIS DO? CONFUSED
//	var query = {};
//	if (req.query.animal) {
//		query = {animal: req.query.animal};
//	}
//	Pet.find(query, function(err, data {
//		var pageData = {
//			pets: data
//		};
	//	res.render('pets', pagaData);
	//}))
//}

router.get('/':cheeseSlug, function(req, res) {
	Cheese.findOne{(slug: req.params.cheeseSlug)}, function(err, data) {
		var pageData = {
			cheese: [data]
		};
		res.render('cheeses', pageData);
	});
});

module.exports = router;
