var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Card', CardSchema);
