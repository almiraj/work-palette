import { Injectable } from '@angular/core';

import { OneDayDto } from '../common/dto/OneDayDto';
import { CalSettings } from '../common/settings/CalSettings';
import { DateRowDto } from './dto/DateRowDto';
import { DateTableDto } from './dto/DateTableDto';

@Injectable({providedIn: 'root'})
export class CalService {

  getDateTable(targetDate: Date): DateTableDto  {
    const targetLastDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

    const targetMonthLastDay = targetLastDate.getDate();

    const dateTable = new DateTableDto(new OneDayDto(targetDate));
    let dateRow: DateRowDto;
    for (let i = 1; i <= targetMonthLastDay; i++) {
      const d = new Date(targetDate.getFullYear(), targetDate.getMonth(), i);
      if (!dateRow || d.getDay() === CalSettings.firstDayOfWeek) {
        dateRow = new DateRowDto();
        dateTable.dateRows.push(dateRow);
      }
      dateRow.dateList.push(new OneDayDto(d));
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
