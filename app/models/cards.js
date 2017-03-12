var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
	user_id: String,
  card:{
    question: String,
    answer: String
  }
});

module.exports = mongoose.model('Card', CardSchema);
