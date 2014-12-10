<?php if(!defined('KIRBY')) exit ?>

title: About
pages: false
files: true
  title:
    label: Image Title (used on the image 'alt' attribute and will show when image is hovered over)
    type: text
  caption:
    label: Caption (displayed below the image)
    type: text
fields:
  title:
    label: Page Title
    type:  text

  _headerOne:
    label: Section - Introduction
    type: headline
  sectionTitleOne:
    label: Section Title
    type: text
  header:
    label: Main Header
    type: text
  about:
    label: About You
    type:  textarea

  _headerTwo:
    label: Section - Client Branding
    type: headline
  sectionTitleTwo:
    label: Section Title
    type: text
  _infoTwo:
    label: Client Brands
    type: info
    text: >
      Images for client brands can be uploaded under the files section on the left,
      where you'll be able to arrange and sort them.

  _headerThree:
    label: Section - Skills
    type: headline
  sectionTitleThree:
    label: Section Title
    type: text
  languages:
    label: Programming Languages
    type: tags
  frameworks:
    label: Frameworks
    type: tags
  workflow:
    label: Workflow
    type: tags

  _headerFour:
    label: Section - Sign-off
    type: headline
  sectionTitleFour:
    label: Section Title
    type: text
  TextSectionFour:
    label: Sign-off Copy
    type:  textarea
