---
title: Hello World
description: A few thoughts on static pages, useful constraints, and leaving enough room to write.
pubDate: 2026-11-10
draft: true
---

A personal website has a fairly straightforward job. It should help someone understand what you do, show them a few things you've worked on, and give them a way to get in touch. Adding a place to write shouldn't make the rest of that harder.

It's tempting to use a small project to try every interesting tool on your list. I understand the appeal. But there's something satisfying about a site you can put down for a few weeks, come back to, and understand without a tour of your own code.

This is a draft article for trying the reading layout. The subject is deliberately close to the project itself, so the page feels like something that could eventually live here.

## Start with the thing someone came to read

For an article, the important part is the text. A good title gives you a reason to start. A clear first paragraph tells you whether you're in the right place. The rest of the page should make it comfortable to keep going.

That sounds obvious until you start designing around an empty content area. An oversized heading can look excellent above two lines of placeholder text. Add six paragraphs, a list, and a code example, and you find out whether the design actually works.

**Realistic content is part of the design process.** Short sentences help, but a page also needs to cope with a longer explanation that takes a little time to get to its point. Both should feel at home in the same column.

> A useful constraint gives you fewer decisions to make the next time you sit down to write.

The same applies to navigation. Once you're reading, you probably need a way back to the article list and a link to the rest of the site. You can get quite far with that.

## Keep the publishing process small

For this site, articles start as Markdown files. The title, description and date sit at the top of the file. The rest is ordinary text, with a little formatting when it helps explain something.

There are a few practical benefits:

- The article and its changes live alongside the site in version control.
- A draft can stay local while its wording and layout are still being worked out.
- The published output is HTML that a browser can read directly.
- Writing another article doesn't require another page template.

A filename such as `keeping-things-simple.md` becomes the basis of an article URL. A small amount of metadata tells the listing what to display. The template handles the repeated parts.

```js
const articles = [
    { title: 'Keeping things simple', draft: false },
    { title: 'Something still taking shape', draft: true },
];

const published = articles.filter((article) => !article.draft);
```

The example is intentionally small. It gives the page some syntax highlighting, indentation and punctuation, without asking you to read a whole application just to judge a code block.

### Make room for the less tidy parts

An article rarely stays as neat as its opening paragraph. Sometimes you need to explain a sequence, compare a couple of options, or link to a detail that would interrupt the main thread.

A sensible editing pass might look like this:

1. Write the explanation without worrying about the layout.
2. Read it back and remove the bits that repeat themselves.
3. Check the page on a narrow screen, including any lists and code.
4. Come back later and see whether the opening still says what you meant.

Inline code such as `draft: true` should sit comfortably inside a sentence. A [link back to the homepage](/) should be easy to spot without turning the whole paragraph into a collection of competing colours.

| Part of the site | What it needs to do |
| --- | --- |
| Homepage | Explain the work and help someone make contact |
| Article list | Make titles, dates and descriptions easy to scan |
| Article | Give the writing enough space to be read |

## Leave yourself somewhere to go

Keeping the first version small doesn't mean every future decision has been made. You might eventually want categories, an archive, or a better way to find an older article. Those are easier choices once there's enough writing to show what would actually be useful.

For now, a readable page and a short route from draft to finished article are enough. The interesting part is what gets written next.

---

*This is sample content for reviewing the blog design. It remains a draft and won't appear in a production build.*
