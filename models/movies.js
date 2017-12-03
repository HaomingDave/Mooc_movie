var mongoose =require('mongoose');
var movieSchema = require('../schemas/movies.js');


var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;