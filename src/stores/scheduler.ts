import { defaultDayRange, weekdayNames } from '@components/Schedule/utils';
import { Database } from '@models/supabase';
import { supabase } from '@utils/supabase';
import { Schedule, TimeRange } from '@components/Schedule/models';
import { action, atom } from 'nanostores';

export type AvailabilityDB = Database['public']['Tables']['availability'];
export type AvailabilityRow = AvailabilityDB['Row'];
export type AvailabilityUpsert = AvailabilityDB['Insert'];
export type AvailabilityUpdate = AvailabilityDB['Update'];
export type ScheduleDB = Database['public']['Tables']['schedule'];
export type ScheduleRow = ScheduleDB['Row'];
export type ScheduleUpsert = ScheduleDB['Insert'];
export type ScheduleUpdate = ScheduleDB['Update'];

export interface Scheduler {
  name: string;
  schedule: Schedule;
}
export const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekend = ['Sunday', 'Saturday'];
export const weekStart = week.indexOf('Monday');
export const weekdays = weekdayNames('en', weekStart, 'long');

export const schedule = atom<Schedule>(
  weekdays.map((d) => {
    return weekend.includes(d) ? [] : [defaultDayRange];
  })
);

export const updateSchedule = action(schedule, 'updateSchedule', (store, index: number, date: number, field: 'start' | 'end') => {
  const schedule = store.get();
  schedule[index][0][field] = date;
  store.set([...schedule]);
  return store.get();
});

export const getSchedule = async (userId: string): Promise<ScheduleRow[]> => {
  try {
    const { data, error } = await supabase.from('schedule').select('*, availability(*)').eq('id', userId);
    if (error) {
      console.error(error);
      return [];
    } else {
      return data;
    }
  } catch (error) {
    return [];
  }
};

export const saveSchedule = async (payload: ScheduleUpsert) => {
  try {
    const { data, error } = await supabase.from('schedule').upsert(payload).select().single();

    if (error) {
      throw error;
    }
    return { data, error };
  } catch (error) {
    throw error;
  }
  return true;
};
