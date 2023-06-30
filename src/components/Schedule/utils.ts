import moment, { Moment } from 'moment';
import { IOption, Schedule, TimeRange } from './models';
import { AvailabilityUpsert as Availability } from '@stores/scheduler';

type WeekdayFormat = 'short' | 'long';

// By default starts on Sunday (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)
export function weekdayNames(locale: string | string[], weekStart = 0, format: WeekdayFormat = 'long') {
  return Array(7)
    .fill(null)
    .map((_, day) => nameOfDay(locale, day + weekStart, format));
}

export function nameOfDay(locale: string | string[] | undefined, day: number, format: WeekdayFormat = 'long') {
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(new Date(1970, 0, day + 4));
}

export const INCREMENT = 15;
const defaultDate = '2000-01-01';
export const timeFormat = (type: 12 | 24) => (type === 12 ? 'h:mma' : 'HH:mm');

export const timeHumanUtc = (date: number | Moment, formatType: 12 | 24) => moment(date).utc(false).format(timeFormat(formatType));

export const getTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const defaultDayRange: TimeRange = {
  start: new Date(new Date(defaultDate).setUTCHours(9, 0, 0, 0)).valueOf(),
  end: new Date(new Date(defaultDate).setUTCHours(17, 0, 0, 0)).valueOf()
};

export const setOptions = () => {
  const options: IOption[] = [];

  const end = moment(defaultDate).utc(true).endOf('day');
  for (let t = moment(defaultDate).utc(true).startOf('day'); t.isBefore(end); t = t.add(INCREMENT, 'minutes')) {
    options.push({
      value: t.toDate().valueOf(),
      label: moment(t).utc(true).format(timeFormat(12))
    });
  }
  // allow 23:59
  options.push({
    value: end.toDate().valueOf(),
    label: timeHumanUtc(end, 12)
  });
  return options;
};

export function getAvailabilityFromSchedule(schedule: Schedule): Availability[] {
  return schedule.reduce((availability: Availability[], times: TimeRange[], day: number) => {
    const addNewTime = (time: TimeRange) => ({
      days: [day],
      startTime: time.start,
      endTime: time.end
    }); /*as Availability*/

    const filteredTimes = times.filter((time) => {
      let idx;
      if ((idx = availability.findIndex((schedule) => schedule.startTime.toString() === time.start.toString() && schedule.endTime.toString() === time.end.toString())) !== -1) {
        availability[idx].days.push(day);
        return false;
      }
      return true;
    });
    filteredTimes.forEach((time) => {
      availability.push(addNewTime(time));
    });
    return availability;
  }, [] as Availability[]);
}

/*

let filteredOptions: IOption[] = [];

const filter = ({ offset, limit, current }: { offset?: any; limit?: any; current?: any }) => {
  if (current) {
    const currentOption = options.find((option) => option.value === moment(current).toDate().valueOf());
    if (currentOption) filteredOptions = [currentOption];
  } else
    filteredOptions = options.filter((option) => {
      const time = moment(option.value);
      return (!limit || time.isBefore(limit)) && (!offset || time.isAfter(offset));
    });
};
*/
