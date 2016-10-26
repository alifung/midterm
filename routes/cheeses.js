// all the ROUTES for the different cheeses!

var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer'); //this is the image upoloading middleware!
var uploadPath = path.join(__dirname, '../public/uploads'); // this is the folder where the images are stored I think?
var upload = multer({ dest: uploadPath }); //

var Cheese = require('../models/cheese'); //this connects back to the model cheese.js

router.get('/home', function(req, res) { //render handlebars template
    res.render('home');
});

router.get('/add', function(req, res) {
    res.render('newcheese');
});

// what is this body thing??
router.post('/add', upload.single('image'), function(req, res) {

    var myFileName = undefined;
// if there is a file...
    if (req.file) {
      myFileName = req.file.filename;
    }

    var cheese = new Cheese({
        location: req.body.place_id, //provided by google
        tag: req.body.tag,
        filename: myFileName //save the filename
    });

    // });
    cheese.save(function(err, data) {
        if (err) {
            console.log(err);

            return res.redirect(404, '/cheeses/add'); // if error, return to the main display
        }

        return res.redirect('./individual-cheese + data._id'); //if success, return to the YOUR cheese
    });
});


//for every individual cheese ID, find the one that matches and send me to that individual cheese
router.get('/:id', function(req, res) {
    // console.log('YO');
    Cheese.findOne({ '_id': req.params.id}, function(err, data) {
        var pageData = {
            showMe: [data]
        };
        res.render('individual-cheese', pageData);
            //  };
            // Cheese.findOne({'_id': req.params.id }, function(err, data) {
            //     if (err) {
            //         console.log(err);
            //     }
            //    return res.render('individual-cheese', data);

    });
});

module.exports = router;
