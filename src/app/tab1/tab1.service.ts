import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class DateRow {
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
  // private dayTableSubject = new BehaviorSubject<number[]>([]);

  private firstDayOfWeek = 0;

  // get dayTable$() {
  //   return this.dayTableSubject.asObservable();
  // }

  getDayTable(targetDate: Date): DateRow[]  {
    const targetLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    console.log({targetLastDate});

    const targetMonthLastDay = targetLastDate.getDate();

    const dateTable: DateRow[] = [];
    let dateRow: DateRow;
    for (let i = 1; i <= targetMonthLastDay; i++) {
      const d = new Date(targetDate.getFullYear(), targetDate.getMonth(), i);
      if (!dateRow || d.getDay() === 0) {
        dateRow = new DateRow();
        dateTable.push(dateRow);
      }
      dateRow.dateList.push(d);
    }

    console.log({dateTable});
    return dateTable;
  }
}
