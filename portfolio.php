<?php
// My portfolio
$brewerlogic = array(
	'work' => array(
		'brewersdroop' => array(
			'title' => "The Brewer's Droop",
			'description' => "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
			'img' => array(
				array(
					'src' => 'work/brewersdroop/brewersdroop_01_home.jpg',
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
	)
);

$json = json_encode($brewerlogic);
header('Content-type: application/json');
echo $json;
