import { defineCollection } from 'astro:content';
// 2. Define your collection(s)
const courseCollection = defineCollection({
  slug: ({ id, defaultSlug }) => {
    // not working as of 2.0.0-beta.4
    // need to put 'slug' in .md
    // or replace('/_index', '/') form main course list
    return defaultSlug.replace('/_index', '/');
  }
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  courses: courseCollection
};
