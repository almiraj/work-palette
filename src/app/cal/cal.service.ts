import { Injectable } from '@angular/core';

export class DateTable {
  date: Date;
  dateRows: DateRow[] = [];

  constructor(date: Date) {
    this.date = date;
  }
}

export class DateRow {
  dateList: Date[] = [];

  toString() {
    return this.dateList.toString();
  }
}

const FIRST_DAY_OF_WEEK = 0;

@Injectable({providedIn: 'root'})
export class CalService {

  getDateTable(targetDate: Date): DateTable  {
    const targetLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

    const targetMonthLastDay = targetLastDate.getDate();

    const dateTable = new DateTable(targetDate);
    let dateRow: DateRow;
    for (let i = 1; i <= targetMonthLastDay; i++) {
      const d = new Date(targetDate.getFullYear(), targetDate.getMonth(), i);
      if (!dateRow || d.getDay() === FIRST_DAY_OF_WEEK) {
        dateRow = new DateRow();
        dateTable.dateRows.push(dateRow);
      }
      dateRow.dateList.push(d);
    }

    if (dateTable.dateRows.length > 0) {
      const targetRowDateList = dateTable.dateRows[0].dateList;
      while (targetRowDateList.length < 7) {
        targetRowDateList.unshift(null);
      }
    }
    if (dateTable.dateRows.length > 1) {
      const targetRowDateList = dateTable.dateRows[dateTable.dateRows.length - 1].dateList;
      while (targetRowDateList.length < 7) {
        targetRowDateList.push(null);
      }
    }

    return dateTable;
  }

}
