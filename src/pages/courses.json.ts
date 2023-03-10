import { getCourseDirectories } from '@utils/collections';
import type { APIRoute } from 'astro';

export const get: APIRoute = async function ({ params, request }) {
  const coursesDir = await getCourseDirectories('courses');

  return {
    body: JSON.stringify(coursesDir)
  };
};
