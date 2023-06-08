import { Collection, CourseRender, CoursesDirectory, CoursesInfos, Render } from '@models/courses';
import { CollectionEntry, getCollection, getEntry } from 'astro:content';
export const idxKey = '/README';

/**
 *
 * @returns List of all active courses index page
 */
export const getAllCourseIndex = async (collection: Collection) => {
  const list = await getCollection(collection, ({ id, data }) => {
    return data.draft !== true && id.toLowerCase().includes(idxKey.toLowerCase());
  });
  const test = list.map((c) => {
    const slug: any = c.slug.toLowerCase().replace(idxKey.toLowerCase(), '/');
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
    return id.startsWith(`${course}/`) && data.draft !== true && !id.toLowerCase().includes(`${course}${idxKey.toLowerCase()}`);
  });
};

/**
 *
 * @returns All active lessons
 */
export const getAllCollectionLessons = async (collection: Collection) => {
  return await getCollection(collection, ({ data, id }) => {
    return data.draft !== true && !id.toLowerCase().includes(idxKey.toLowerCase());
  });
};

/**
 *
 * @returns All active lessons for a list of courses
 */
export const getAllLessonsPerCourse = async (collection: Collection, courses: string[]) => {
  return await getCollection(collection, ({ data, id }) => {
    const lessonId = id.toLowerCase();
    const courseIndexId = idxKey.toLowerCase();
    return data.draft !== true && !lessonId.includes(courseIndexId) && !!courses.find((course) => lessonId.includes(course));
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
    const entry = await getEntry(collection, `${course}`);

    if (entry) {
      entryResult = await entry.render();
      return entryResult;
    }
  } catch (error) {}
  return entryResult;
};

/**
 *
 * @param course
 * @returns get course title, number of lessons and total duration
 */
export const getCourseInfo = async (collection: Collection, course: string) => {
  let result: CoursesInfos | null = null;
  try {
    const entry = await getEntry(collection, `${course}${idxKey.toLowerCase()}`);

    if (entry) {
      const lessons = await getCourseLessons(collection, `${course}`);
      const lessonsData = await Promise.all(
        lessons.map(async (l) => {
          const { remarkPluginFrontmatter } = (await l.render()) as CourseRender;
          return remarkPluginFrontmatter?.minutesRead;
        })
      );

      const duration = lessonsData.reduce((acc, minutesRead) => {
        return acc + minutesRead.minutes;
      }, 0);

      result = {
        title: entry.data.title,
        quantity: lessons.length,
        duration
      };
    }
  } catch (error) {}

  return result;
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
    // data.minutesRead = getReadingTime(entry?.body || '');

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
        if (data.draft !== true && !slug.toLowerCase().includes(`${cat}${idxKey.toLowerCase()}`)) {
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
  let prevEntry: CollectionEntry<Collection> | null = null;
  let nextEntry: CollectionEntry<Collection> | null = null;
  const coursesResult = await getCourseDirectories('courses');

  const coursesDir = coursesResult[course];

  if (coursesDir) {
    const courses = coursesResult[course].courses;
    const slugs = coursesDir.slugs || [];
    const activeIndex = slugs.findIndex((s) => s === slug);
    // prevEntry = courses ? courses[activeIndex - 1] || null : null;
    // nextEntry = courses ? courses[activeIndex + 1] || null : null;

    prevEntry = activeIndex > 0 ? courses?.[activeIndex - 1] || null : null;
    nextEntry = activeIndex !== -1 && activeIndex < slugs.length - 1 ? courses?.[activeIndex + 1] || null : null;
  }

  return {
    prevEntry,
    nextEntry
  };
};
