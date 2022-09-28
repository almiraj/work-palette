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

    const startSplit = this.startTimeValue.split(':');
    dto.startTimeHour = Number(startSplit[0]);
    dto.startTimeMinute = Number(startSplit[1]);

    if (this.endTimeValue) {
      const endSplit = this.endTimeValue.split(':');
      dto.endTimeHour = Number(endSplit[0]);
      dto.endTimeMinute = Number(endSplit[1]);
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
