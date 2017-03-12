// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://localhost/mongodb');
//var Bear     = require('./app/models/bear');
var Card    = require('./app/models/cards')

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/cards')

	// create a card (accessed at POST http://localhost:8080/cards)
	.post(function(req, res) {

		var card = new Card();		// create a new instance of the Card model
		//card.name = req.body.name;  // set the cards name (comes from the request)
		card.user_id = req.body.user_id;
		card.card = req.body.card;
		card.card.question = req.body.card[0].question;
		card.card.answer = req.body.card[0].answer;

		card.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Card created!' });
		});


	})

	// get all the cards (accessed at GET http://localhost:8080/api/cards)
	.get(function(req, res) {
		Card.find(function(err, cards) {
			if (err)
				res.send(err);

			res.json(cards);
		});
	});

// on routes that end in /cards/:card_id
// ----------------------------------------------------
router.route('/cards/:card_id')

	// get the card with that id
	.get(function(req, res) {
		Card.findById(req.params.card_id, function(err, card) {
			if (err)
				res.send(err);
			res.json(card);
		});
	})

	// update the card with this id
	.put(function(req, res) {
		Card.findById(req.params.card_id, function(err, card) {

			if (err)
				res.send(err);

			card.name = req.body.name;
			card.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Card updated!' });
			});

		});
	})

	// delete the card with this id
	.delete(function(req, res) {
		Card.remove({
			_id: req.params.card_id
		}, function(err, card) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
