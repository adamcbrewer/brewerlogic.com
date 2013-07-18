<?php
$config = new stdClass;

$config->ga = 'UA-31471338-1';
$config->site_url = "http://" . $_SERVER['HTTP_HOST'];
$config->work = $config->site_url . "/work";

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
