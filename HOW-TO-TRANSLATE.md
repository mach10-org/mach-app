## how to translate content !

- Create a branch "translation"
- Content files (.md and .mdx) files can be translated directly
- Code files (.jsx, .vue, .astro) have variables set for all text. There are in ./src/constants/localize.ts
- translate all needed files then merge the new branch

#### "localize.ts" file

This file is broken down by sections to help find theme on the site:

- notifications
- pages
- errors,
- menu,
- footer
- common (differents variables like submit button....)
- etc...

#### "QUIZZ"

- Questions in an .mdx are translated in this file

```jsx
<Quiz slug='my-slug-test' client:only='vue' label="Quelle est la couleur du cheval blanc d'Henry 4">
  <Quiz.Option label='Rouge' explain='Tu as perdu' />
  <Quiz.Option label='Bleu' explain='Tu as perdu' />
  <Quiz.Option isAnswer xp='10' label='Blanc' explain='Tu as gagné' />
</Quiz>
```
