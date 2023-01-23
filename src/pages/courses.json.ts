import type { CoursesDirectory } from '@models/courses';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const get: APIRoute = async function ({ params, request }) {
  const coursesDir: CoursesDirectory = {};

  await getCollection('courses', ({ slug }) => {
    const directories: string[] = slug.split('/');

    if (directories.length > 1) {
      const cat = directories[0];
      const slug = [...directories].pop();

      if (!coursesDir[cat]) {
        coursesDir[cat] = [];
      }
      if (slug) {
        coursesDir[cat].push(slug);
      }

      return true;
    }
    return false;
  });

  return {
    body: JSON.stringify(coursesDir)
  };
};
