import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { DateModalDto, DateModalPage } from '../date-modal/date-modal.page';

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
  @Input() date: Date;
  @Input() selectedDate: Date;
  @Output() selectCol = new EventEmitter<Date>();

  selected: boolean;
  detectDoubleSubject = new DetectDoubleSubject();

  constructor(private modalCtrl: ModalController) {}

  ngOnChanges() {
    this.selected = (this.selectedDate === this.date);
  }

  onClick() {
    this.selectCol.emit(this.date);
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
          date: this.date
        }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
      const dateModalDto: DateModalDto = data;
      if (role === 'confirm') {
        if (dateModalDto.startTimeHour !== undefined) {
          this.date = new Date(
            this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
            dateModalDto.startTimeHour, dateModalDto.startTimeMinute
          );
        }
      this.onClick();
    }
  }
}
