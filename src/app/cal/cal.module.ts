import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalPageRoutingModule } from './cal-routing.module';
import { CalPage } from './cal.page';
import { CalColPage } from '../cal-col/cal-col.page';
import { DateModalPage } from '../date-modal/date-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalPageRoutingModule
  ],
  declarations: [CalPage, CalColPage, DateModalPage]
})
export class CalPageModule {}
