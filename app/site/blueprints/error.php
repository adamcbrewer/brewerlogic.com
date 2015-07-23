<?php if(!defined('KIRBY')) exit ?>

# =====================
# Error Page
# =====================

title: 404

pages: false

files: true

fields:
  title:
    label: Page Title
    type:  text

  # Section - Contact
  # =====================
  _headerOne:
    label: Section – General
    type: headline
  buttons:
    label: Buttons
    type: structure
    entry: >
      {{title}} ({{type}}) – {{url}}
    fields:
      title:
        label: Title
        type: text
      url:
        label: URL
        type: page
      type:
        label: Type
        type: select
        default: primary
        options:
          primary: Primary

