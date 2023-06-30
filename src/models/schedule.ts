import { AvailabilityUpsert as Availability, AvailabilityRow } from '@stores/scheduler';
export interface IOption {
  readonly label: string;
  readonly value: number;
}
export type TimeRange = {
  start: number | Date;
  end: number | Date;
};

export type Schedule = TimeRange[][];

export type WorkingHours = {
  days: number[];
  startTime: number;
  endTime: number;
};

export type ScheduleAvailibility = Partial<AvailabilityRow> & { availability: Availability[] };
