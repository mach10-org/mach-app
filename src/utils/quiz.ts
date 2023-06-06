import { QuizOption } from '@models/courses';
import { getUser } from '@stores/auth';
import { updateUser, upsertProfile } from '@stores/profile';
import { User } from './auth';
import { UserMetadata } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * If answer is added && is the first time && is true = Add points
 * @param user
 * @param points
 */
export const savePoint = async (user: User, slug: string, points: number) => {
  try {
    const { data, error } = await supabase.from('answers').select('*').eq('user', user.id).eq('course_slug', slug).is('success', true);

    if (data?.length === 1) {
      const xp = parseInt(user?.user_metadata.xp, 10) + points;
      points = xp;
      const { data, error } = await upsertProfile({ id: user.id, xp });
      if (!error) {
        user.user_metadata = data as UserMetadata;
        updateUser(user);
      }
    } else {
      points = 0;
    }
  } catch (error) {}
  console.log('savePoint', points);

  return points;
};

export const saveAnswer = async (option: QuizOption, course_slug: string) => {
  let user = await getUser();
  let xp = option?.xp ? parseInt(option.xp, 10) : 0;
  try {
    const { error } = await supabase.from('answers').insert([{ course_slug, title: option.label, user: user?.id, success: option?.isAnswer || false }]);

    if (user && option.isAnswer && xp) {
      xp = await savePoint(user, course_slug, xp);
    }
  } catch (error) {}
  console.log('user updated', user);

  return xp;
};
