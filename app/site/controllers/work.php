<?php

return function($site, $pages, $page) {

    $data = array();

    // Returns all work projects that have been set to display on the work page
    $projects = $page
        ->children()
        ->visible();

    $data['projects'] = $projects;

    return $data;

};
