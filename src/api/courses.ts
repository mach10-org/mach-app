import { Collection, CoursesDirectory, Render } from '@models/courses';
import { getCollection, getEntryBySlug } from 'astro:content';

/**
 *
 * @returns List of all active courses index page
 */
export const getAllCourseIndex = async (collection: Collection) => {
  return await getCollection(collection, ({ id, data }) => {
    return data.draft !== true && id.includes(`/_index`);
  });
};

/**
 *
 * @param course
 * @returns All active lessons of a course
 */
export const getCourseLessons = async (collection: Collection, course: string) => {
  return await getCollection(collection, ({ id, data }) => {
    return id.startsWith(`${course}/`) && data.draft !== true && !id.includes(`${course}/_index`);
  });
};

/**
 *
 * @returns All active lessons
 */
export const getAllCollectionLessons = async (collection: Collection) => {
  return await getCollection(collection, ({ data, id }) => {
    return data.draft !== true && !id.includes(`/_index`);
  });
};

/**
 *
 * @param course
 * @returns Index page of a course folder
 */
export const getCourseIndex = async (collection: Collection, course: string) => {
  let entryResult: Render | null = null;
  try {
    const entry = await getEntryBySlug(collection, `${course}/`);
    console.log('entry', entry);

    if (entry) {
      entryResult = await entry.render();
      return entryResult;
    }
  } catch (error) {}
  return entryResult;
};

export const getCourseDirectories = async (collection: Collection) => {
  const coursesDir: CoursesDirectory = {};

  await getCollection(collection, ({ slug }) => {
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
  return coursesDir;
};
