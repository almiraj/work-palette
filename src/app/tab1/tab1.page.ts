import { Component, OnInit } from '@angular/core';

import { isHoliday } from 'japanese-holidays';
import { DateTable, Tab1Service } from './tab1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  days: number[] = [];
  dateTable: DateTable;

  constructor(private tab1Service: Tab1Service) {}

  ngOnInit() {
    this.dateTable = this.tab1Service.getDateTable(new Date());
  }
}
