import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultUserPage } from './consult-user.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultUserPageRoutingModule {}
