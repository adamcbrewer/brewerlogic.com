<?php

class AboutPage extends BasePage {

    /**
     * Profile image
     *
     */
    public function profile_image () {

        return $this->get_image_by_filename($this->profile_image_filename());

    }


    /**
     * Clients
     *
     */
    public function clients () {

        $clients = $this->clients_structure()->toStructure();

        if ($clients) {
            foreach ($clients as $key => $client) {
                $image = $this->images()->find($client->image_filename());
                if (!$image) {
                    $image = $this->images();
                }
                $client->image = $image;
            }
        }

        return $clients;


    }

}