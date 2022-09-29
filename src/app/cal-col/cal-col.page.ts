import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { OneDayDto } from '../common/dto/OneDayDto';
import { DetectDoubleSubject } from '../common/components/DetectDoubleSubject';
import { DateModalPage } from '../date-modal/date-modal.page';

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
    }
    this.onClick();
  }
}
