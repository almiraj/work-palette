import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class DateTable {
  yearMonth: string;
  dateRows: DateRow[] = [];

  constructor(year: number, month: number) {
    this.yearMonth = year.toString() + '/' + month.toString();
  }
}

export class DateRow {
  dateList: Date[] = [];

  getLast() {
    return this.dateList[this.dateList.length - 1];
  }

  toString() {
    return this.dateList.toString();
  }
}

@Injectable({providedIn: 'root'})
export class Tab1Service {
  private firstDayOfWeek = 0;

  getDateTable(targetDate: Date): DateTable  {
    const targetLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    console.log({targetLastDate});

    const targetMonthLastDay = targetLastDate.getDate();

    const dateTable = new DateTable(targetDate.getFullYear(), targetDate.getMonth() + 1);
    let dateRow: DateRow;
    for (let i = 1; i <= targetMonthLastDay; i++) {
      const d = new Date(targetDate.getFullYear(), targetDate.getMonth(), i);
      if (!dateRow || d.getDay() === this.firstDayOfWeek) {
        dateRow = new DateRow();
        dateTable.dateRows.push(dateRow);
      }
      dateRow.dateList.push(d);
    }
    console.log('aaa');

    if (dateTable.dateRows.length > 0) {
      const targetRowDateList = dateTable.dateRows[0].dateList;
      while (targetRowDateList.length < 7) {
        targetRowDateList.unshift(null);
      }
      console.log({targetRowDateList});
    }
    if (dateTable.dateRows.length > 1) {
      const targetRowDateList = dateTable.dateRows[dateTable.dateRows.length - 1].dateList;
      while (targetRowDateList.length < 7) {
        targetRowDateList.push(null);
      }
      console.log({targetRowDateList});
    }

    console.log({dateTable: dateTable.dateRows});
    return dateTable;
  }
}
