var express = require('express');
var router = express.Router(); //what allows us to run the router and connect to the server

var Cheese = require('../models/cheese'); //don't need the cheese.js but this refers to cheese.js 
//to get the cheese model with the schema inside of it


//get that homepage! Is the res.json the response once we get it? is the status just so we can console log it?
router.get('/', function(req, res) {
	res.json({
		status: 'ok'
	})
});


//this is so when people submit tags, it separates them by commas
//NOT NEEDED BECAUSE I AM TAGGING VIA DROPDOWN
//router.post('/cheese', function(req,res) {
//	var tags = undefined;
//	if (req.body.tags) {
//		tags = req.body.tags.split(',');
//	}
//})

var cheese = new Cheese({ //why is there all of this body stuff? what is it referring to?
	//name: req.body.name
	slug: slugify(req.body.name) // questions here!
	location: req.body.location,
	tags: tags
});

cheese.save(function(err, data) {
	if (err) {
		console.log(err); //let us know what's up and that we have an error!
		res.status(500);
		resturn res.json({ //get that json info!!!
			status: 'error'
			message: 'your cheese dish could not be added!', //error message
			error: err
		});
	}

	//the success function! 
	return res.json({
		status: 'ok',
		message: 'cheese succesfully added!',
		cheese: data //what does this do?
	});
});
});

router.get('/cheese', function(req, res, next) { // this directs to the individual cheese page?
	Cheese.find({}, function(err, data) {
		if (err) {
			res.status(500);
			resturn res.json({
				status: 'error',
				message: 'the cheeses could not be found!'

			});
		}
		return res.json(data); //I think we defined this as cheese somewhere, so when it gets the data, it should be the cheeses, i f there is not an error that is caught in the step beforehand!
	});
});

// via http://gist.github.com/mathewbyrne/1280286 // if i want slugify stuff, do that here!

module.exports = router; //set that router going!!





