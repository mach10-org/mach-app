# How to add a course

If you choose to create a course in English (`en`), create the `content/en/courses/my-course` folder.

## Main page

The main page is named `00-index.md`

Example: `content/en/courses/my-course/00-index.md`

It contains the short description of your course and its metadata:

```md
---
title: My course
description: Description of my course
preview: my-course.png
lastmod: 2023-05-24T04:28:53.384Z
totalHours: 4
order: 1
---

## Introduction

A great introduction
```

Note: the table of content will be automatically generated

- `title`: Name of your course
- `description`: Description of your course, it appears on the list of all the courses
- `preview`: Image of your course. You should put in the `public/img` folder. It appears on the list of all the courses
- `lastmod`: The last time the file was edited
- `totalHours`: The estimated number of hours it will take to finish the course
- `order`: In which position the course should appear in the list

## Lesson pages

The lesson pages are ordered by their name. Example, in the `content/en/courses/my-course/` you will have the files:

```
00-index.md
01-lesson1.md
02-lesson2.md
```

### Sections

It's possible to add sections to your course, you will need to create a `_dir.yml` file to set its title:

```
00-index.md
01-section1/
|__ _dir.yml
|__ 01-lesson1.md
|__ 02-lesson2.md
02-section2/
|__ _dir.yml
|__ 01-lesson3.md
```

Content of `_dir.yml`:

```yml
title: Section title
```