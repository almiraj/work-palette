import { Component, OnInit } from '@angular/core';

import dateFormat from 'dateformat';

import { DateTable, CalService } from './cal.service';

@Component({
  selector: 'app-cal',
  templateUrl: 'cal.page.html',
  styleUrls: ['cal.page.scss']
})
export class CalPage implements OnInit {
  dateTable: DateTable;
  title: string;
  selectedDate: Date;
  detailValue: string;

  constructor(private calService: CalService) {}

  ngOnInit() {
    this.dateTable = this.calService.getDateTable(new Date());
    this.title = dateFormat(this.dateTable.date, 'yyyy/mm');
  }

  onSelectCalCol(selectedDate: Date) {
    this.selectedDate = selectedDate;
    this.detailValue = this.formatDate(this.selectedDate);
  }

  formatDate(selectedDate: Date) {
    if (selectedDate) {
      return dateFormat(selectedDate, 'yyyy/mm/dd HH:MM');
    } else {
      return '';
    }
  }
}
