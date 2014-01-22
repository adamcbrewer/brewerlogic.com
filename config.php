<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$config = array(
	"ga" => "UA-31471338-1"
);

$projects_file = file_get_contents('projects.json');
$projects = json_decode($projects_file, false);
