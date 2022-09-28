import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DateModalDto } from '../date-modal/date-modal.page';

import { CalColService } from './cal-col.service';

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

  onClick() {
    this.selectCol.emit(this.date);
  }

  onConfirmModal(dateModalDto: DateModalDto) {
    //WIP
    if (dateModalDto.startTimeHour !== undefined) {
      this.date = new Date(
        this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
        dateModalDto.startTimeHour, dateModalDto.startTimeMinute
      );
    }

    //WIP
    this.selectCol.emit(this.date);
  }
}
