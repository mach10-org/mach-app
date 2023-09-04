# How to add a Quiz

Inside the your lesson's markdown add:

```
::quiz
---
title: Which term does NOT describe JavaScript?
slug: term-not-js
xp: 10
answers:
  - label: Garbage collected
    explanation: No prize for you
  - label: Interpreted
    explanation: Yeah, that ain't it
  - label: Statically Typed
    explanation: Hella good job
    isCorrect: true
---
::
```

The variables are written in YAML

- `title`: Title of the quiz
- `slug`: the ID of the the quiz. Answers are stored in database, if logged, the user will see his/her answer
- `xp`: the amount of XP the quiz give
- `answers`: List of answers
  - `label`: Label of the answer
  - `explanation`: The text shown when the user submit his/her answer
  - `isCorrect`: The correct answer
