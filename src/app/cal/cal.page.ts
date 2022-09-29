import { Component, OnInit } from '@angular/core';

import dateFormat from 'dateformat';

import { OneDayDto } from '../common/dto/OneDayDto';
import { CalService } from './cal.service';
import { DateTableDto } from './dto/DateTableDto';

@Component({
  selector: 'app-cal',
  templateUrl: 'cal.page.html',
  styleUrls: ['cal.page.scss']
})
export class CalPage implements OnInit {
  dateTable: DateTableDto;
  title: string;
  selectedOneDayDto: OneDayDto;

  constructor(private calService: CalService) {}


  ngOnInit() {
    this.dateTable = this.calService.getDateTable(new Date());
    this.title = dateFormat(this.dateTable.oneDayDto.toDate(), 'yyyy/mm');
  }

  onSelectCalCol(selectedOneDayDto: OneDayDto) {
    this.selectedOneDayDto = selectedOneDayDto;
  }

  getDetailSentence() {
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
