<?php if(!defined('KIRBY')) exit ?>

title: Site
pages:
  sortable: false
  max: 5
  hide: true
fields:
  _pageSettingsOne:
    label: Site Configuration
    type: headline
  title:
    label: Site Name
    type: text
    width: 1/2
  author:
    label: Your Name
    type: text
    width: 1/2
  email:
    label: Contact Email Address
    type: email
    width: 1/2
  analytics:
    label:  Google Analytics Tracking code
    type: text
    default: UA-XXXXXX-X
    width: 1/2
  description:
    label: Site Description (SEO meta)
    type:  textarea
  keywords:
    label: Site Keywords (SEO meta)
    type:  tags
  copyright:
    label: Copyright
    type:  textarea

  _pageSettingsTwo:
    label: Social Links
    type: headline
  twitter:
    label: Twitter
    type: url
    icon: twitter
    width: 1/2
  github:
    label: Github
    type: url
    icon: github
    width: 1/2
  linkedin:
    label: LinkedIn
    type: url
    icon: linkedin
    width: 1/2

  _pageSettingsThree:
    label: Twitter Settings
    type: headline
  showTweets:
    label: Show Twitter Stream?
    type: toggle
    text: yes/no
    width: 1/2
  _infoOne:
    label: &nbsp;
    type: info
    width: 1/2
    text: >
      Turning off the stream will not display any tweets, anywhere on the site, from your account.
  tweetFilter:
    label: Tweet-Filter Keyword
    type: text
    width: 1/2
  _infoTwo:
    label: &nbsp;
    type: info
    width: 1/2
    text: >
      Only tweets with this hashtag will be displayed. If it's left blank all your tweets will
      be displayed by default.
