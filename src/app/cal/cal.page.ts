import { Component, OnInit } from '@angular/core';

import { DateTable, CalService as CalService } from './cal.service';

@Component({
  selector: 'app-cal',
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

  onSelectCalCol(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  formatDate(date: Date) {
    if (date) {
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    } else {
      return '';
    }
  }
}
