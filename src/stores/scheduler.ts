import { defaultDayRange, getAvailabilityFromSchedule, weekdayNames } from '@components/Schedule/utils';
import { Database } from '@models/supabase';
import { supabase } from '@utils/supabase';
import { Schedule, ScheduleAvailibility, TimeRange } from '@models/schedule';
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

export interface UpdateSchedule {
  dayIndex: number;
  index: number;
  date: number | Date | TimeRange;
  field: 'start' | 'end' | 'create' | 'delete' | 'add' | 'remove';
}
export const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekend = ['Sunday', 'Saturday'];
export const weekStart = week.indexOf('Monday');
export const weekdays = weekdayNames('en', weekStart, 'long');
export const DEFAULT_SCHEDULE: Schedule = weekdays.map((d) => (weekend.includes(d) ? [] : [JSON.parse(JSON.stringify(defaultDayRange))]));
export const schedule = atom<Schedule>(DEFAULT_SCHEDULE);

export const setSchedule = action(schedule, 'updateSchedule', (store, data: Schedule) => {
  store.set(data);
  return store.get();
});

export const updateSchedule = action(schedule, 'updateSchedule', (store, payload: UpdateSchedule) => {
  const schedule = store.get();
  const { dayIndex, index, field, date } = payload;

  if (['create', 'delete'].includes(field)) {
    if (field === 'create') {
      schedule[dayIndex] = [date as TimeRange];
    } else {
      schedule[dayIndex] = [];
    }
  } else if (['add', 'remove'].includes(field)) {
    if (field === 'add') {
      schedule[dayIndex][index + 1] = date as TimeRange;
    } else {
      schedule[dayIndex].splice(index, 1);
    }
  } else {
    schedule[dayIndex][index][field] = date;
  }

  store.set(schedule);
  return store.get();
});

export const getSchedule = async (userId: string): Promise<ScheduleAvailibility> => {
  try {
    const { data, error } = await supabase.from('schedule').select('*, availability(*)').eq('id', userId);
    if (error) {
      console.error(error);
      throw error;
    } else {
      return data?.[0];
    }
  } catch (error) {
    return error;
  }
};

export const saveSchedule = async (payload: ScheduleUpsert) => {
  try {
    const { data: scheduleData, error: scheduleError } = await supabase.from('schedule').upsert(payload).select().single();
    if (scheduleError) {
      throw scheduleError;
    }

    const avails = getAvailabilityFromSchedule(schedule.get());
    avails.map((avail) => {
      avail.scheduleId = scheduleData?.id;
      return avail;
    });

    const { error: errorDelete } = await supabase.from('availability').delete().eq('scheduleId', scheduleData.id);
    if (errorDelete) {
      throw errorDelete;
    }

    const { data: availabilityData, error: availabilityError } = await supabase.from('availability').insert(avails).select();
    console.log('availabilityData', availabilityData);
    if (availabilityError) {
      throw availabilityError;
    }

    return { scheduleData, availabilityData };
  } catch (error) {
    throw error;
  }
  return true;
};
