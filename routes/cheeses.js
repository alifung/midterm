// all the ROUTES for the different cheeses!

var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer'); //this is the image upoloading middleware!
var uploadPath = path.join(__dirname, '../public/uploads'); // this is the folder where the images are stored I think?
var upload = multer({ dest: uploadPath }); //

var Cheese = require('../models/cheese'); //this connects back to the model cheese.js

// router.get('/home', function(req, res) { //render handlebars template
//     res.render('home');
// });

router.get('/home', function(req, res) {
    //console.log(res.render(_id));
    var query = {}
    if (req.query.id) {
        query = { id: req.query.id};
    }
    Cheese.find(query, function(err, data) {
        var pageData = {
            Cheeses: data
        };
        res.render('home', pageData);
    });
});



router.get('/add', function(req, res) {
    res.render('newcheese');
});

// what is this body thing??
router.post('/add', upload.single('image'), function(req, res) {
    // var placeId = undefined;
    // if (req.place) {
    //     placeId = req.place.place_id;
    // }
    var myFileName = undefined;
    // if there is a file...
    if (req.file) {
        myFileName = req.file.filename;
    }

    var cheese = new Cheese({
        location: req.body.locationID, //provided by google
        tag: req.body.tag,
        filename: myFileName //save the filenam
    });

    console.log(myFileName);
    // });
    cheese.save(function(err, data) {
        if (err) {
            console.log(err);

            return res.redirect(404, '/cheeses/add'); // if error, return to the main display
        }

        return res.redirect('./individual-cheese' + data._id); //if success, return to the YOUR cheese
    });
});

router.get('/individual-cheese:id', function(req, res) {
    Cheese.find({ '_id': req.params.id }, function(err, data) {
        if (err) {
            console.log(err);
        }
        var pageData = {
            cheeses: data
        }
        console.log(data);
        return res.render('individual-cheese', pageData);
    });
});

router.get('/home:tag', function(req, res) {
    Cheese.find({'tag': req.params.tag}, function(err, data) {
        if (err) {
            console.log(err);
        }
        var pageData = {
            tags: data
        }
        console.log(data);
        return res.render('home', pageData);
    });
    
});

router.get('individual-cheese', function(req, res) {
    //console.log(res.render(_id));

    var query = {}
    if (req.query.id) {
        query = { id: req.query.id };
    }
    Cheese.find(query), (function(err, data) {
        var pageData = {
            cheeses: data
        };
        res.render('individual-cheese' + data._id, pageData);
    });
});

module.exports = router;
