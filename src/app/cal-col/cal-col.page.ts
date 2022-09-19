import { Component, OnInit } from '@angular/core';

import { isHoliday } from 'japanese-holidays';
import { DateTable, CalColService } from './cal-col.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'cal-col.page.html',
  styleUrls: ['cal-col.page.scss']
})
export class CalColPage implements OnInit {
  days: number[] = [];
  dateTable: DateTable;
  selectedDate: Date;

  constructor(private calColService: CalColService) {}

  ngOnInit() {
    this.dateTable = this.calColService.getDateTable(new Date());
  }

  selectCol(date: Date) {
    this.selectedDate = date;
  }

  formatDate(date: Date) {
    if (date) {
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    } else {
      return '';
    }
  }
}
