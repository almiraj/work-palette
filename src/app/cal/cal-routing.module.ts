import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalColPage } from '../cal-col/cal-col.page';
import { CalPage } from './cal.page';

const routes: Routes = [
  {
    path: '',
    component: CalPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalPageRoutingModule {}
