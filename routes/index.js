
/*
 * GET home page.
 */

exports.index = function(req, res) {
	var app = req.app,
		config = app.get('config');

	res.render('index.html', {
		title: 'Brewer Logic',
		ga: config.ga
	});

	console.dir(req)
};
