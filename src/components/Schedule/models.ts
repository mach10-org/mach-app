export interface IOption {
  readonly label: string;
  readonly value: number;
}
export type TimeRange = {
  start: number;
  end: number;
};

export type Schedule = TimeRange[][];

export type WorkingHours = {
  days: number[];
  startTime: number;
  endTime: number;
};
