<?php
// My portfolio
$brewerlogic = array(
	'work' => array(
		array(
			'key' => 'brewersdroop',
			'title' => "The Brewer&#8217;s Droop",
			'intro' => 'This is some addition introduction text. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			'website' => 'htp://brewersdroop.co.za',
			'description' => "Lorem ipsum dolor <a href='http://adamcbrewer.com' target='_blank'>adamcbrewer.com</a> sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. <br /><br />Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
			'img' => array(
				array(
					'src' => 'http://fillmurray.com/1000/1800',
					'alt' => 'Homepage',
					'title' => 'The homepage'
				),
				array(
					'src' => 'work/brewersdroop/brewersdroop_02_singledroop.jpg',
					'alt' => 'Single page',
					'title' => 'A single page'
				),
				array(
					'src' => 'work/brewersdroop/brewersdroop_03_archives.jpg',
					'alt' => 'Archives',
					'title' => 'Archives'
				),
				array(
					'src' => 'work/brewersdroop/brewersdroop_04_about.jpg',
					'alt' => 'About',
					'title' => 'About'
				),
				array(
					'src' => 'work/brewersdroop/brewersdroop_05_contact.jpg',
					'alt' => 'Contact',
					'title' => 'Contact'
				)
			)
		),
		array(
			'key' => 'testproject1',
			'title' => "Test Project 1",
			'intro' => '',
			'description' => "shdfk jshdf kj shdkf jhskdfjh sdfkhs dkjsk dfhskdj fkjh",
			'img' => array(
				array(
					'src' => 'http://fillmurray.com/1000/1800',
					'alt' => 'Homepage',
					'title' => 'The homepage'
				),
				array(
					'src' => 'http://fillmurray.com/1000/1400',
					'alt' => 'Single page',
					'title' => 'A single page'
				)
			)
		),
		array(
			'key' => 'testproject2',
			'title' => "Test Project 2",
			'intro' => '',
			'description' => "shdfk jshdf kj shdkf jhskdfjh sdfkhs dkjsk dfhskdj fkjh",
			'img' => array(
				array(
					'src' => 'http://fillmurray.com/1000/1800',
					'alt' => 'Homepage',
					'title' => 'The homepage'
				),
				array(
					'src' => 'http://fillmurray.com/1000/1400',
					'alt' => 'Single page',
					'title' => 'A single page'
				)
			)
		),
		array(
			'key' => 'testproject3',
			'title' => "Test Project 3",
			'intro' => "",
			'meta' => '',
			'description' => "shdfk jshdf kj shdkf jhskdfjh sdfkhs dkjsk dfhskdj fkjh",
			'img' => array(
				array(
					'src' => 'http://fillmurray.com/1000/1500',
					'alt' => 'Homepage',
					'title' => 'The homepage'
				),
				array(
					'src' => 'http://fillmurray.com/1000/600',
					'alt' => 'Single page',
					'title' => 'A single page'
				)
			)
		)
	),
	'about' => array(
		'title' => 'Lorem Ipsum',
		'blurb' => 'The porfolio of webmaker and developer, <a href="http://adamcbrewer.com" target="_blank">Adam Brewer</a>',
		'description' => 'This is a showcase of all my development work. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.<br /></br />Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
	),
	'404' => array(
		array(
			'title' => '404',
			'cite' => "Empty your mind, be formless, shapeless &mdash; like water. Now you put water in a cup, it becomes the cup; You put water into a bottle it becomes the bottle; You put it in a teapot it becomes the teapot. Now water can flow or it can crash. <strong>Be water, my friend</strong>.<br /><br />&mdash; <a href='http://en.wikiquote.org/wiki/Bruce_Lee' target='_blank'>Bruce Lee</a>"
		),
		array(
			'title' => '404',
			'cite' => "Ain't nobody got time for that!<br /><br />&mdash; <a href='http://www.youtube.com/watch?v=Nh7UgAprdpM' target='_blank'>Sweet Brown</a>"
		)
	)
);

$json = json_encode($brewerlogic);
header('Content-type: application/json');
echo $json;
