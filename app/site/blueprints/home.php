<?php if(!defined('KIRBY')) exit ?>

# =====================
# Home
# =====================

title: Home

pages: false

files: false

fields:
  title:
    label: Page Title
    type:  text

  # Section - Hero
  # =====================
  _headerOne:
    label: Section - Hero
    type: headline
  text:
    label: Intro Text
    type:  text
  buttonWork:
    label: Button – Work
    type: text
  buttonAbout:
    label: Button – About
    type: text
  status:
    label: Current Status
    type: text

  # Section - Features
  # =====================
  _headerTwo:
    label: Section - Featured Work
    type: headline
  sectionTitleTwo:
    label: Section Title
    type: text
  buttonFeatured:
    label: Button – Featured
    type: text
  featured_project_uids:
    label: Featured Work
    type: structure
    width: 1/2
    entry: >
      <b>Project ID</b> &nbsp;–&nbsp; <em>{{ uid }}</em>
    fields:
      uid:
        label: Project ID
        type: select
        options: query
        query:
          page: work
          fetch: visibleChildren
          value: '{{uid}}'
          text: '{{uid}}'

  # Section - Twitter
  # =====================
  _headerThree:
    label: Section - Twitter
    type: headline
  sectionTitleThree:
    label: Section Title
    type: text
  buttonTwitter:
    label: Button – Twitter
    type: text
