import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { DateModalDto, DateModalPage } from '../date-modal/date-modal.page';

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

  detectDoubleFlag: boolean;
  detectDoubleSubject = new Observable(observer => {
    if (!this.detectDoubleFlag) {
      this.detectDoubleFlag = true;
    } else {
      this.detectDoubleFlag = false;
      observer.next();
    }
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnChanges() {
    this.selected = (this.selectedDate === this.date);
  }

  onClick() {
    this.selectCol.emit(this.date);
  }

  onTouchStart() {
    const that = this;
    const subscription = this.detectDoubleSubject.subscribe({
      next: async () => {
        await that.onDblClick();
      }
    });

    setTimeout(() => {
      this.detectDoubleFlag = false;
      console.log('unsubscribe double touch');
      subscription.unsubscribe();
    }, 1000);
  }

  async onDblClick() {
    const modal = await this.modalCtrl.create({
        component: DateModalPage
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.onConfirmModal(data);
    }
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
