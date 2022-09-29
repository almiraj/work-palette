import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DatetimeChangeEventDetail, DatetimeCustomEvent, ModalController } from '@ionic/angular';
import dateFormat from 'dateformat';
import { OneDayDto } from '../common/OneDayDto';

import { DateModalService } from './date-modal.service';

@Component({
  selector: 'app-date-modal',
  templateUrl: 'date-modal.page.html',
  styleUrls: ['date-modal.page.scss']
})
export class DateModalPage implements OnInit {
  @Input() date: Date;
  @Input() oneDayDto: OneDayDto;

  title: string;
  initialStartHourMinute: string;
  initialEndHourMinute: string;

  startHourMinute: string;
  endHourMinute: string;

  // Typically referenced to your ion-router-outlet
  presentingElement = null;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.title = dateFormat(this.date, 'yyyy/mm/dd');
    console.log('this.oneDayDto.startHourMinute');
    console.log(this.oneDayDto.startHourMinute);
    console.log('OneDayDto.startHourMinuteDefault');
    console.log(OneDayDto.startHourMinuteDefault);
    console.log('this.oneDayDto.startHourMinute || OneDayDto.startHourMinuteDefault');
    console.log(this.oneDayDto.startHourMinute || OneDayDto.startHourMinuteDefault);

    this.initialStartHourMinute = this.oneDayDto.startHourMinute || OneDayDto.startHourMinuteDefault;
    this.initialEndHourMinute = this.oneDayDto.endHourMinute || OneDayDto.endHourMinuteDefault;
  }

  onCancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onConfirm() {
    const regexp = /^(\d{2}):(\d{2})$/;
    if (this.startHourMinute) {
      this.oneDayDto.startHourMinute = this.startHourMinute;
    }
    if (this.endHourMinute) {
      this.oneDayDto.endHourMinute = this.endHourMinute;
    }

    return this.modalCtrl.dismiss(this.oneDayDto, 'confirm');
  }

  onChangeStart(event: Event) {
    const e: DatetimeCustomEvent = event as DatetimeCustomEvent;
    this.startHourMinute = [e.detail.value].join();
  }

  onChangeEnd(event: Event) {
    const e: DatetimeCustomEvent = event as DatetimeCustomEvent;
    this.endHourMinute = [e.detail.value].join();
  }
}
