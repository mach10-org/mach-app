import { defineCollection } from 'astro:content';
// 2. Define your collection(s)
const courseCollection = defineCollection({
  slug: ({ id, defaultSlug }) => {
    return defaultSlug.replace('/_index', '/');
  }
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  courses: courseCollection
};
