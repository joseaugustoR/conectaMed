import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasConsultasPage } from './minhas-consultas.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasConsultasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasConsultasPageRoutingModule {}
