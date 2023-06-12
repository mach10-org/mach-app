import { QuizOption } from '@models/courses';
import { getUser } from '@stores/auth';
import { Profile, updateUser, upsertProfile } from '@stores/profile';
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
    const { data, error } = await supabase.from('answers').select('*').eq('course_slug', slug).is('success', true);
    const profile = user.user_metadata as Profile;

    if (data?.length === 1) {
      const xp = profile.xp + points;
      points = xp;

      const { data, error } = await upsertProfile({ ...profile, id: user.id, xp });
      if (!error) {
        updateUser(data as UserMetadata);
      }
    } else {
      points = 0;
    }
  } catch (error) {}

  return points;
};

export const saveAnswer = async (option: QuizOption, course_slug: string) => {
  let user = await getUser();
  let xp = option?.xp ? parseInt(option.xp, 10) : 0;
  try {
    const { error } = await supabase.from('answers').insert([{ course_slug, title: option.label, user: user?.id, success: option?.isAnswer || false }]);
    if (!error && user && option.isAnswer && xp) {
      xp = await savePoint(user, course_slug, xp);
    }
  } catch (error) {}

  return xp;
};
