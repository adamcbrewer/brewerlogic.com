<?php

class BasePage extends Page {

    /**
     * Get an image object by filename
     *
     */
    public function get_image_by_filename ($filename = "") {

        $image = $this->images()->find($filename);
        if (!$image) {
            // return a kirby object, so not to break the page
            $image = $this->images();
        }

        return $image;

    }

}
