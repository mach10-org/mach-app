import { action, atom } from 'nanostores';
import { supabase } from '@utils/supabase';
import { getUser } from '@stores/auth';
import { CoursesInfos } from '@models/courses';
import { Database } from '@models/supabase';

export type LastURL = Database['public']['Tables']['last_url'];
export type LastURLRow = LastURL['Row'];
export type LastURLUpsert = LastURL['Insert'];
export type LastURLUpdate = LastURL['Update'];
export type LastURLRowSingle = {
  updated_at: string | null;
  url: string;
  title: string;
  main: boolean | null;
  course: string;
};

export interface PayloadCourseTaken {
  course: string;
  slug: string;
  next?: string;
  courseInfo?: CoursesInfos;
  title?: string;
  courseId?: string;
}

export interface CourseTaken {
  courseId: string;
  lessonId: string;
}
export interface LearningLesson {
  id: string;
  slug: string;
  title: string;
  course_id: string;
  updated_at: string;
}
export interface Learning {
  id: string;
  quantity: number;
  completed: boolean;
  user: string;
  created_at: string;
  title: string;
  slug: string;
  learning_lesson: LearningLesson[];
}

export const courseTaken = atom<Learning[]>([]);

/**
 * Get all course taken
 */
export const getCourseTaken = action(courseTaken, 'getCourseTaken', async (store, userId: string) => {
  const data = await getLearningRecords(userId);
  store.set([...data]);
  return store.get();
});

/**
 * New course started
 */
export const setCourseTaken = action(courseTaken, 'setCourseTaken', async (store, payload: PayloadCourseTaken) => {
  try {
    let user = await getUser();
    let res: boolean = false;
    if (user) {
      res = await saveCourse(user.id, payload);
      getCourseTaken(user.id);
    }
    return res;
  } catch (error) {}

  return false;
});

/**
 * Allow user to set lesson "undone"
 */
export const resetCourse = action(courseTaken, 'resetCourse', async (store, userId: string, payload: PayloadCourseTaken) => {
  const res = await deleteCourse(payload);
  if (res) {
    getCourseTaken(userId);
  }
  return store.get();
});

/**
 * Add a new course by User
 * @param profile
 * @returns
 */
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
    console.log('saveCourse 1: learning select');

    const { data: courseList, error } = await supabase.from('learning').select('id').eq('user', userId).eq('slug', payload.course);
    if (error) {
      throw error;
    }
    let courseId = courseList?.length ? courseList[0].id : null;
    if (!courseList.length) {
      const dataToSave = {
        created_at: new Date().toISOString(),
        quantity: payload?.courseInfo?.quantity || 0,
        slug: payload.course,
        title: payload?.courseInfo?.title,
        user: userId
      };
      const { data: courseCreated, error } = await supabase.from('learning').insert(dataToSave).select().single();

      if (!error) {
        courseId = courseCreated.id;
      }
    }

    if (courseId) {
      await saveLesson(courseId, payload);
    } else {
      return false;
    }

    return true;
  } catch (error) {
    console.log('saveCourse error', error);
    throw error;
  }
};

/**
 * Delete course
 * @param payload
 * @returns
 */
export const deleteCourse = async (payload: PayloadCourseTaken) => {
  try {
    const { data, error } = await supabase.from('learning_lesson').delete().eq('id', payload.courseId);

    if (!error) {
      return true;
    }
  } catch (error) {
    console.log('saveCourse error', error);
    return false;
  }
};

/**
 * Save course lesson on "click next"
 * @param courseId
 * @param payload
 * @returns
 */
export const saveLesson = async (courseId: string, payload: PayloadCourseTaken) => {
  const dataToSave = {
    slug: payload.slug,
    title: payload.title,
    course_id: courseId
  };
  try {
    const { data: lessonCreated, error } = await supabase.from('learning_lesson').upsert(dataToSave, { onConflict: 'course_id, slug' }).select().single();

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
  return true;
};

/**
 * Get all lessons taken by User
 * @param userId
 * @returns
 */
export const getLearningRecords = async (userId: string): Promise<Learning[]> => {
  try {
    const { data, error } = await supabase.from('learning').select('*, learning_lesson(*)').eq('user', userId);
    if (error) {
      console.error(error);
      return [];
    } else {
      return data as Learning[];
    }
  } catch (error) {
    return [];
  }
};

export const saveLastUrl = async (payload: LastURLUpsert) => {
  try {
    const { data, error } = await supabase.from('last_url').upsert(payload);
    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
  return true;
};

export const getLastUrl = async (): Promise<LastURLRowSingle> => {
  try {
    const { data, error } = await supabase.from('last_url').select('updated_at, url, title, main, course').single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
