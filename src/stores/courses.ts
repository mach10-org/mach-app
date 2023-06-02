import { action, atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface PayloadCourseTaken {
  course: string;
  slug: string;
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

export const setCourseTaken = action(courseTaken, 'setCourseTaken', (store, payload: PayloadCourseTaken) => {
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

  return store.get();
});
