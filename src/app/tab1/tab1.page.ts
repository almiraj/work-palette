import { Component, OnInit } from '@angular/core';

import { isHoliday } from 'japanese-holidays';
import { Tab1Service } from './tab1.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  days: number[] = [];
  dateTable;

  constructor(private tab1Service: Tab1Service) {}

  ngOnInit() {
    this.dateTable = this.tab1Service.getDayTable(new Date());

    // const todayDate = new Date();
    // const todayLastDate = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
    // console.log({todayLastDate});

    // const todayMonthLastDay = todayLastDate.getDate();
    // for (let i = 1; i <= todayMonthLastDay; i++) {
    //   this.days.push(i);
    // }
  }
}
