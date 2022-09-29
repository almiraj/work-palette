export class OneDayDto {
  static startHourMinuteDefault: string;
  static endHourMinuteDefault: string;

  year: number;
  month: number;
  dayOfMonth: number;
  startHourMinute: string;
  endHourMinute: string;

  constructor(date: Date)
  constructor(year: number, month: number, dayOfMonth: number)
  constructor(dateOrYear: Date | number, month?: number, dayOfMonth?: number) {
    if (dateOrYear instanceof Date) {
      const date = dateOrYear as Date;
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.dayOfMonth = date.getDate();
    } else {
      this.year = dateOrYear as number;
      this.month = month;
      this.dayOfMonth = dayOfMonth;
    }
  }

  toDate() {
    return new Date(this.year, this.month - 1, this.dayOfMonth);
  }
}
