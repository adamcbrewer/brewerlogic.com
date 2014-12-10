<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: false
files:
  sortable: true
  fields:
    caption:
      label: Caption (optional)
      type: text
    description:
      label: Description (optional)
      type: textarea
fields:

  _pageSettingsOne:
    label: Project Information
    type: headline
  _infoOne:
    label: Please Note
    type: info
    text: >
      Make sure the project thumbnail is named _thumb.jpg_, otherwise the first project image will be used and likely cropped.

      If you want to feature this project on the Home page, please make sure to upload an appropriately sized image name _feature.jpg_.
  title:
    label: Title
    type:  text
  summary:
    label: Short Summary
    type:  text
  intro:
    label: Introduction
    type:  textarea
  website:
    label: Website (optional)
    type: url
    width: 1/2
  year:
    label: Date
    type:  text
    width: 1/2
  sign-off:
    label: Sign-off (optional)
    type:  textarea

  homepage:
    label: Display this project on the Home page?
    type: toggle
    text: yes/no
    default: no
    width: 1/2
  _infoTwo:
    label: &nbsp;
    type: info
    width: 1/2
    text: >
      If the following option is enabled then this project will be displayed on the Home page, using the first uploaded image (not the thumbnail). There's no limit to the number of projects displayed on the Home page.
