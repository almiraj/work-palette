import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalColPage } from './cal-col.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CalColPageRoutingModule } from './cal-col-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CalColPageRoutingModule
  ],
  declarations: [CalColPage]
})
export class CalColPageModule {}
