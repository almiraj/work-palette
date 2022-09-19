import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalColPage } from './cal-col.page';

const routes: Routes = [
  {
    path: '',
    component: CalColPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalColPageRoutingModule {}
