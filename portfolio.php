<?php
// My portfolio
$brewerlogic = array(
	'work' => array(
		'brewersdroop' => array(
			'title' => "The Brewer's Droop",
			'description' => "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
			'img' => array(
				array(
					'src' => 'http://fillmurray.com/800/1400',
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
		)
	),
	'404' => array(
		array(
			'title' => '404',
			'cite' => "Empty your mind, be formless, shapeless &mdash; like water. Now you put water in a cup, it becomes the cup; You put water into a bottle it becomes the bottle; You put it in a teapot it becomes the teapot. Now water can flow or it can crash. <strong>Be water, my friend</strong>.<br />
			<br />
			&mdash; <a href='http://en.wikiquote.org/wiki/Bruce_Lee' target='_blank'>Bruce Lee</a>"
		)
	)
);

$json = json_encode($brewerlogic);
header('Content-type: application/json');
echo $json;
