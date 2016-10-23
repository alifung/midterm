var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs'); // do I need slugs??

var cheeseSchema = new Schema({ //don't need a name, but then i do need slugs?

	location: {
		coords: [Number],
		name: String
	},

	tags: [String], // this is going to be equivalent to dishes. 
	imageURL: String
}); 



cheeseSchema.plugin(URLSlugs('name', {field: 'slug'})); // more for the slugs!

var Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese; //require this file, and then you get the pet model!