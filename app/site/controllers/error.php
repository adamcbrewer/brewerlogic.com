<?php

require_once('vendor/autoload.php');

return function($site, $pages, $page) {

    $data = array();

    $tumblr_config = c::get('tumblr');

    $client = new Tumblr\API\Client($tumblr_config['consumer_key'], $tumblr_config['consumer_secret']);
    echo '<pre>';
    print_r($client);
    echo '</pre>';
    die();

    // $client->setToken($token, $tokenSecret);

    return $data;

};
