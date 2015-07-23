<?php if(!defined('KIRBY')) exit ?>

# =====================
# Project
# =====================

title: Project

pages: false

files:
  sortable: true

fields:

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
      <b>Thumbnail</b> &nbsp;–&nbsp; <em>410px x 320px</em> <br>
      <b>Feature</b> &nbsp;–&nbsp; <em>994px</em> <br>
      <b>All others</b> &nbsp;–&nbsp; <em>1300px (full), 615px (half), 395px (one third), 835px (two thirds)</em>
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