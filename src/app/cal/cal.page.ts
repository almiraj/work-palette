import { Component, OnInit } from '@angular/core';

import { isHoliday } from 'japanese-holidays';
import { DateTable, CalService as CalService } from './cal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'cal.page.html',
  styleUrls: ['cal.page.scss']
})
export class CalPage implements OnInit {
  days: number[] = [];
  dateTable: DateTable;
  selectedDate: Date;

  constructor(private calService: CalService) {}

  ngOnInit() {
    this.dateTable = this.calService.getDateTable(new Date());
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