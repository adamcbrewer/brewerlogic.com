<?php if(!defined('KIRBY')) exit ?>

title: 404
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
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

