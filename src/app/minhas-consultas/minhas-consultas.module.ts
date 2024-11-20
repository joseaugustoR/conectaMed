import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasConsultasPageRoutingModule } from './minhas-consultas-routing.module';

import { MinhasConsultasPage } from './minhas-consultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasConsultasPageRoutingModule
  ],
  declarations: [MinhasConsultasPage]
})
export class MinhasConsultasPageModule {}
