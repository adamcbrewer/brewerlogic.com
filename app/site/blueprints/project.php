<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: false
files:
  sortable: true
  fields:
    title:
      label: Image Title (used on the image 'alt' attribute and will show when image is hovered over)
      type: text
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
      Make sure the project thumbnail is named _thumb_, otherwise the first project image will be used and likely cropped.
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
