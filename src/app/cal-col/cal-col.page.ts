import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { isHoliday } from 'japanese-holidays';
import { DateTable, CalColService } from './cal-col.service';

@Component({
  selector: 'app-cal-col',
  templateUrl: 'cal-col.page.html',
  styleUrls: ['cal-col.page.scss']
})
export class CalColPage implements OnChanges {
  @Input() date: Date;
  @Input() selectedDate: Date;
  @Output() selectCol = new EventEmitter<Date>();

  selected: boolean;

  constructor(private calColService: CalColService) {}

  ngOnChanges() {
    this.selected = (this.selectedDate === this.date);
  }

  click() {
    this.selectCol.emit(this.date);
  }
}
