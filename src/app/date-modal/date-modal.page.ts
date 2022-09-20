import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { DateModalService } from './date-modal.service';

@Component({
  selector: 'app-date-modal',
  templateUrl: 'date-modal.page.html',
  styleUrls: ['date-modal.page.scss']
})
export class DateModalPage implements OnInit {
  @Input() date: Date;

  // Typically referenced to your ion-router-outlet
  presentingElement = null;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
}
