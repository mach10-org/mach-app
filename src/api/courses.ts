import { Collection, CoursesDirectory, Render } from '@models/courses';
import { CollectionEntry, getCollection, getEntryBySlug } from 'astro:content';

/**
 *
 * @returns List of all active courses index page
 */
export const getAllCourseIndex = async (collection: Collection) => {
  const list = await getCollection(collection, ({ id, data }) => {
    return data.draft !== true && id.includes(`/_index`);
  });

  const test = list.map((c) => {
    const slug: any = c.slug.replace('/_index', '/');
    c.slug = slug;
    return c;
  });

  return test;
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

/**
 *
 * @param collection
 * @returns params to build courses index page
 */
export const getCourseDirectories = async (collection: Collection) => {
  const coursesDir: CoursesDirectory = {};

  await getCollection(collection, (entry) => {
    const { slug, data } = entry;
    const directories: string[] = slug.split('/');

    if (directories.length > 1) {
      const cat = directories[0];
      const alias = [...directories].pop();

      if (!coursesDir[cat]) {
        coursesDir[cat] = {
          slugs: [],
          courses: [],
          entry: null
        };
      }
      if (alias) {
        if (data.draft !== true && !slug.includes(`${cat}/_index`)) {
          coursesDir[cat].slugs?.push(alias);
          coursesDir[cat].courses?.push(entry);
        }
      }
      if (entry && coursesDir[cat]) {
        coursesDir[cat].entry = entry;
      }

      return true;
    }
    return false;
  });
  return coursesDir;
};

export const coursePager = async (course: string, slug: string) => {
  const coursesResult = await getCourseDirectories('courses');

  const coursesDir = coursesResult[course];
  const courses = coursesResult[course].courses as CollectionEntry<Collection>[];
  const slugs = coursesDir.slugs || [];
  const activeIndex = slugs?.findIndex((s) => s === slug);
  // const prevSlugIdx = activeIndex - 1;
  // const nextSlugIdx = activeIndex + 1;
  const prevEntry = courses[activeIndex - 1] || null;
  const nextEntry = courses[activeIndex + 1] || null;

  return {
    prevEntry,
    nextEntry
  };
};
