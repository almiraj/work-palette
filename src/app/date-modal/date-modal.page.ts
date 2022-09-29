import { Component, Input, OnInit } from '@angular/core';
import { DatetimeCustomEvent, ModalController } from '@ionic/angular';

import dateFormat from 'dateformat';
import { OneDayDto } from '../common/dto/OneDayDto';
import { CalSettings } from '../common/settings/CalSettings';

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

    this.initialStartHourMinute = this.oneDayDto.startHourMinute || CalSettings.startHourMinuteDefault;
    this.initialEndHourMinute = this.oneDayDto.endHourMinute || CalSettings.endHourMinuteDefault;
  }

  onCancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onConfirm() {
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
