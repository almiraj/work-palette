import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DatetimeChangeEventDetail, DatetimeCustomEvent, ModalController } from '@ionic/angular';
import dateFormat from 'dateformat';

import { DateModalService } from './date-modal.service';

export class DateModalDto {
  startTimeHour: number;
  startTimeMinute: number;
  endTimeHour: number;
  endTimeMinute: number;
}

@Component({
  selector: 'app-date-modal',
  templateUrl: 'date-modal.page.html',
  styleUrls: ['date-modal.page.scss']
})
export class DateModalPage implements OnInit {
  @Input() date: Date;
  @Output() confirmModal = new EventEmitter<DateModalDto>();

  title: string;
  initialStartHour: string;
  startTimeValue: string;
  endTimeValue: string;

  // Typically referenced to your ion-router-outlet
  presentingElement = null;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.title = dateFormat(this.date, 'yyyy/mm/dd');
    this.initialStartHour = '10:00';
  }

  onCancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onConfirm() {
    const dto = new DateModalDto();

    const regexp = /^(\d{2}):(\d{2})$/;
    if (this.startTimeValue) {
      const hourMinute = this.startTimeValue.match(regexp);
      if (hourMinute) {
        dto.startTimeHour = Number(hourMinute[1]);
        dto.startTimeMinute = Number(hourMinute[2]);
      }
    }

    if (this.endTimeValue) {
      const hourMinute = this.endTimeValue.match(regexp);
      if (hourMinute) {
        dto.endTimeHour = Number(hourMinute[1]);
        dto.endTimeMinute = Number(hourMinute[2]);
      }
    }

    this.confirmModal.emit(dto);
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  onChangeStart(event: Event) {
    const e: DatetimeCustomEvent = event as DatetimeCustomEvent;
    this.startTimeValue = [e.detail.value].join();
  }

  onChangeEnd(event: Event) {
    const e: DatetimeCustomEvent = event as DatetimeCustomEvent;
    this.endTimeValue = [e.detail.value].join();
  }
}
