---
title: Slop happens
description: Humans write rough code too. What matters is knowing what we can accept, what needs work, and where mistakes cost too much.
pubDate: 2026-11-17
draft: false
---

Would you be happy to hand over your codebase to another developer today? Or are there a few things you'd want to change before they saw it?

Now imagine an AI agent had written those parts. Would you judge them differently?

I think we give ourselves quite a lot of room to produce rough work. We get tired, we're under pressure, we leave something awkward because it works and there's another task waiting. Then we look at generated code and call it slop.

Sometimes that's fair. But what was actually wrong? Did it fail? Was it difficult to understand? Or did it make a choice we wouldn't have made?

A button that doesn't work needs a different response from a file structure we don't like. Calling both slop doesn't help us decide what to do next.

<p class="pull-quote">Slop-free zones don't promise perfect code. They mean we agree where unexplained decisions and unchecked behaviour aren't acceptable, and give those parts more care.</p>

## What would make the next change easier?

Imagine asking an agent to build three settings forms. They work, validation runs and changes are saved. But each form has its own implementation, with similar markup and repeated rules.

My first reaction might be, "Why haven't you made a shared component?"

Perhaps that's the right question. If a rule needs changing in all three places, somebody has to remember every copy. But suppose the forms call different APIs, expect different request shapes and handle validation differently. The agent may have followed those existing patterns.

A shared form could end up full of options and conditions to accommodate the differences. We'd have fewer repeated lines and something harder to work on.

I'd want to try two changes. Add a field to one form. Then change a validation rule that all three should share. What would another developer need to understand and edit in each case?

Perhaps the rule should be shared while the forms stay separate. Perhaps a shared field component is enough. The useful question is whether the next change becomes easier and less likely to go wrong.

"I wouldn't have written it like that" is a starting point for a review. I still need to explain what difficulty it creates.

## The code we keep is guidance too

If I give a junior developer a vague brief and they build the wrong thing, I need to look at the direction I gave them. I'd ask the same of myself when working with an agent.

"Build me a to-do app. Make no mistakes."

For one person or a team? Should tasks survive a refresh? Do they sync between devices? Is this a prototype or something another developer will extend next month?

The agent might ask. If it carries on, those gaps become assumptions. It could build a working application and still miss what I had in mind.

The codebase adds another set of instructions. If there are three ways of doing the same thing, an old approach beside a newer one and nothing showing which to follow, what am I expecting it to copy?

With those forms, I might have asked it to follow the existing pattern. It found separate implementations and continued that approach. I dislike the result, but I've contributed to it.

That doesn't make every failure mine. Models get things wrong even with clear instructions and relevant context. Sometimes I need a smaller task, a different approach or to write the code myself.

But before asking for the next feature, I could improve one representative example in the area we're changing. Make its rules clear. Resolve conflicting guidance. Give the agent something worth following. That helps the next human developer too.

## First attempts and slop-free zones

Sometimes I need to start building before I know quite what I want. Writing code gives me something to react to. I change direction, rewrite parts and get feedback.

I don't expect my own first attempt to be the finished job. Why would I expect an agent to get there in one go?

Rough work can help me find out whether an idea is worth pursuing. The mistake is accepting it as finished because it runs, or because the agent says it's done.

An agent can also produce more code than I can properly check. I need to keep each attempt small enough to understand before building on it.

Even in code we keep, some rough edges may be fine. An awkward name or repeated styles might be easy to live with while trying a layout. If the behaviour is right, someone else can work with it and it's easy to change, tidying it may not be the best use of our time.

I'd want much less tolerance for guesswork in code that decides who can see somebody else's data, or what gets deleted when they press a button.

Those are the areas I'd treat as slop-free zones.

I'd judge that by what a mistake could affect and how easily we could undo it. Even a style change can hide an important control. A component is only a low-risk place to experiment if the consequences really are small.

With the forms, I can leave the decision about sharing markup open while I explore. I need much more certainty about whose settings get changed when I press save.

## Give the next attempt a better chance

If the last AI result disappointed you, pick one small part and work out where it fell short.

Could the agent find the relevant code and run the checks? Did the checks cover the behaviour you cared about? Had you explained which rules needed to stay consistent and where things should differ?

Then ask it to explain the problem before changing everything. What has it assumed? What would the proposed change make easier? What else could it affect?

For the forms, that might mean extracting one shared validation rule, keeping the different save behaviour separate, then checking all three forms.

<p class="pull-quote">If the result is harder to follow, making it shorter hasn't achieved much.</p>

An agent reviewing its own work can give me useful findings to examine. It doesn't prove the result is correct. I still choose what to accept.

I'd change one thing about the process and see whether it helps. A clearer example, a smaller task, a check that catches the failure. Include the time spent correcting the result when judging whether it improved.

Slop happens when humans write code too. We still have to decide what's good enough to keep. If I want an agent to do better, I need to be able to say what better means.
