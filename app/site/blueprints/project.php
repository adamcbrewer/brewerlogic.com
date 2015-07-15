<?php if(!defined('KIRBY')) exit ?>

# =====================
# Project
# =====================

title: Project

pages: false

files:
  sortable: true
  fields:
    caption:
      label: Caption (optional)
      type: text
    description:
      label: Description (optional - shown below the image)
      type: textarea
    descriptionLocation:
      label: Location of the image description
      type: radio
      default: inside
      options:
        inside: Default ('inside' the image container)
        above: Above
        below: Below
    _lineOne:
      type: line
    _infoOne:
      label: Choosing your layout
      type: info
      text: >
        Project images are full width by default. Selecting one of the options below will float the images according to the size shown, but remember to pair one ratio with another. For example: half-size images should be ordered next to each other and likewise for third and two-thirds images.


        Layout ratios do not affect thumbnails or homepage feature images.
    layout:
      label: Layout Options/Ratios
      type: radio
      default: full
      options:
        full: Full width
        half: Half size
        third: One third
        twothirds: Two thirds

fields:

  # Section - Images
  # =============
  _headerOne:
    label: Section – Project Images
    type: headline
  featuredFilename:
    label: Feature Image (defaults to image named 'feature')
    type: select
    options: images
  thumbFilename:
    label: Thumbnail Image (defaults to image named 'thumb')
    type: select
    options: images
  _infoOne:
    type: info
    text: >
      **Images sizes:**<br>
      Thumbnail: 410x320 <br>
      Feature: 994xXXX <br>
      All others: 1300xXXX (full), 615xYYY (half), 395xZZZ (one third), 835xZZZ (two thirds)
  project_images_structure:
    label: Project Images
    type: structure
    entry: >
      <b>Image</b> &nbsp;–&nbsp; <i>{{filename}}</i> <br>
      <b>Caption</b> &nbsp;–&nbsp; <i>{{caption}}</i> <br>
      <b>Size</b> &nbsp;–&nbsp; <i>{{layout}}</i>
    fields:
      filename:
        label: Image
        type: select
        options: images
      caption:
        label: Caption
        type: text
      layout:
        label: Layout Options/Ratios
        type: radio
        default: full
        options:
          full: Full width
          half: Half size
          third: One third
          twothirds: Two thirds

  # Section - Information
  # =============
  _headerTwo:
    label: Section – Project Information
    type: headline
  title:
    label: Title
    type:  text
  summary:
    label: Short Summary (displayed beneath features and thumbnails)
    type:  text
  intro:
    label: Introduction
    type:  textarea
  website:
    label: Website (optional)
    type: url
    width: 1/2
  when:
    label: Date
    type:  text
    width: 1/2
  signoff:
    label: Sign-off (optional)
    type:  textarea