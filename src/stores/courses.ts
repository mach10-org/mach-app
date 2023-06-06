import { action, atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { supabase } from '@utils/supabase';
import { User } from '@utils/auth';
import { getUser } from '@stores/auth';

export interface PayloadCourseTaken {
  course: string;
  slug: string;
  href: Location;
}
export interface CourseTaken {
  courseId: string;
  lessonId: string;
}

const primitive = {
  encode: JSON.stringify,
  decode: JSON.parse
};

export const courseTaken = persistentAtom<CourseTaken[]>('course-taken', [], primitive);

export const setCourseTaken = action(courseTaken, 'setCourseTaken', async (store, payload: PayloadCourseTaken) => {
  console.log('setCourseTaken');
  /*
  const prevData = store.get();
  const { course: courseId, slug: lessonId } = payload;
  if (courseId && lessonId) {
    const isFound = prevData.find((c) => c.courseId === courseId && c.lessonId === lessonId);
    if (!isFound) {
      const data = { courseId, lessonId };
      prevData.push(data);
      store.set([...prevData]);
    }
  }
*/

  try {
    let user = await getUser();
    let res: boolean = false;
    if (user) {
      res = await saveCourse(user.id, payload);
    }
    return res;
  } catch (error) {
    throw error;
  }
  return store.get();
});

export const resetCourse = action(courseTaken, 'resetCourse', (store, payload: PayloadCourseTaken) => {
  const prevData = store.get();
  const { course, slug } = payload;
  if (course && slug) {
    const filtered = prevData.filter((c) => !(c.courseId === course && c.lessonId === slug));
    store.set([...filtered]);
  }

  return store.get();
});

export const addCourse = async (profile: any) => {
  try {
    const { data, error } = await supabase.from('learning').insert(profile).select().single();

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * If answer is added && is the first time && is true = Add points
 * @param user
 * @param points
 */
export const saveCourse = async (userId: string, payload: PayloadCourseTaken) => {
  try {
    const { data: courseList, error } = await supabase.from('learning').select('*').eq('user', userId).eq('slug', payload.course);
    if (error) {
      throw error;
    }
    console.log('courseList', courseList);

    if (!courseList?.length) {
      //TODO: Save new course
    }

    const dataToSave = [];
    // if (data?.length === 1) {
    // const { data, error } = await supabase.from('learning').insert(dataToSave);

    // }
    return true;
  } catch (error) {
    console.log('saveCourse error', error);
    throw error;
  }
};

export const saveLesson = async (payload: PayloadCourseTaken) => {
  return true;
};
