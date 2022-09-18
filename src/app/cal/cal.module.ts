import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalPage } from './cal.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CalPageRoutingModule } from './cal-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CalPageRoutingModule
  ],
  declarations: [CalPage]
})
export class CalPageModule {}
