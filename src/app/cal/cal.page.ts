import { Component, OnInit } from '@angular/core';

import dateFormat from 'dateformat';
import { OneDayDto } from '../common/OneDayDto';

import { DateTable, CalService } from './cal.service';

@Component({
  selector: 'app-cal',
  templateUrl: 'cal.page.html',
  styleUrls: ['cal.page.scss']
})
export class CalPage implements OnInit {
  dateTable: DateTable;
  title: string;
  selectedOneDayDto: OneDayDto;
  detailValue: string;

  constructor(private calService: CalService) {}

  ngOnInit() {
    OneDayDto.startHourMinuteDefault = '10:00';
    OneDayDto.endHourMinuteDefault = '18:00';

    this.detailValue = this.toDetailSentence();
    this.dateTable = this.calService.getDateTable(new Date());
    this.title = dateFormat(this.dateTable.oneDayDto.toDate(), 'yyyy/mm');
  }

  onSelectCalCol(selectedOneDayDto: OneDayDto) {
    console.log('selectedOneDayDto');
    console.log(selectedOneDayDto);

    this.selectedOneDayDto = selectedOneDayDto;
    this.detailValue = this.toDetailSentence();
  }

  toDetailSentence() {
    if (this.selectedOneDayDto) {
      return this.selectedOneDayDto.month + '/' + this.selectedOneDayDto.dayOfMonth + ' '
        + this.selectedOneDayDto.startHourMinute + '～' + this.selectedOneDayDto.endHourMinute;
    } else {
      return '';
    }
  }

  toOneDayDto(date: Date) {
    return new OneDayDto(date);
  }
}
