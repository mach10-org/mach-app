import { QuizOption } from '@models/courses';
import { supabase, upsertProfile, getUser } from './auth';

export const savePoint = async (points: number) => {
  console.log('savePoint');

  try {
    const user = await getUser();
    const xp = parseInt(user?.user_metadata.xp, 10) + points;
    if (user?.id) {
      const { data, error } = await upsertProfile({ id: user.id, xp });

      console.log('savePoint data', data);
      console.log('savePoint error', error);
      //saveUserProfile
    }
  } catch (error) {}
};

export const saveAnswer = async (option: QuizOption, course_slug: string) => {
  console.log('saveAnswer', option);

  try {
    const { data, error } = await supabase
      .from('answers')
      .insert([{ course_slug, title: option.label, success: option?.isAnswer || false }]);
    console.log('saveAnswer data', data);
    console.log('saveAnswer error', error);

    if (option.isAnswer && option.xp) {
      const xp = parseInt(option.xp, 10);
      await savePoint(xp);
    }
  } catch (error) {}
};
