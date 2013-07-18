
/*
 * GET home page.
 */

exports.index = function(req, res) {
	var config = req.app.get('config');
	res.render('index.html', {
		title: 'Brewer Logic',
		ga: config.ga
	});
};
