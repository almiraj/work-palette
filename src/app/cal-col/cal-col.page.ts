import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { OneDayDto } from '../common/OneDayDto';
import { DateModalPage } from '../date-modal/date-modal.page';

import { CalColService } from './cal-col.service';

class DetectDoubleSubject {
  private flag = false;
  private subject = new Observable(observer => {
    if (!this.flag) {
      this.flag = true;
    } else {
      this.flag = false;
      observer.next();
    }
  });
  private subscription: Subscription;

  subscribeTemporary = (observer: PartialObserver<void>, temporaryTime: number) => {
    this.subscription = this.subject.subscribe(observer);
    setTimeout(() => {
      this.flag = false;
      this.subscription.unsubscribe();
    }, temporaryTime);
  };
}

@Component({
  selector: 'app-cal-col',
  templateUrl: 'cal-col.page.html',
  styleUrls: ['cal-col.page.scss']
})
export class CalColPage implements OnChanges {
  @Input() oneDayDto: OneDayDto;
  @Input() selectedOneDayDto: OneDayDto;
  @Output() selectCol = new EventEmitter<OneDayDto>();

  selected: boolean;
  detectDoubleSubject = new DetectDoubleSubject();

  constructor(private modalCtrl: ModalController) {}

  ngOnChanges() {
    this.selected = (this.oneDayDto === this.selectedOneDayDto);
  }

  onClick() {
    this.selectCol.emit(this.oneDayDto);
  }

  onTouchStart() {
    this.detectDoubleSubject.subscribeTemporary({
      next: async () => {
        await this.onDblClick();
      }
    }, 500);
  }

  async onDblClick() {
    const modal = await this.modalCtrl.create({
        component: DateModalPage,
        componentProps: {
          oneDayDto: this.oneDayDto
        }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    const modalOneDayDto: OneDayDto = data;
    if (role === 'confirm') {
      this.oneDayDto = modalOneDayDto;
      // this.oneDayDto.year = modalOneDayDto.year;
      // this.oneDayDto.month = modalOneDayDto.month;
      // this.oneDayDto.dayOfMonth = modalOneDayDto.dayOfMonth;
      // this.oneDayDto.startTimeHour = modalOneDayDto.startTimeHour;
      // this.oneDayDto.startTimeMinute = modalOneDayDto.startTimeMinute;
    }
    this.onClick();
  }
}
