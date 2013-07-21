
/*
 * GET home page.
 */

exports.index = function(req, res) {
	var app = req.app,
		config = app.get('config'),
		projects = app.get('projects');

	res.render('index.html', {
		title: 'Brewer Logic',
		ga: config.ga,
		projects: projects
	});

};
