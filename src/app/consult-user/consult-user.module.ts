import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultUserPageRoutingModule } from './consult-user-routing.module';

import { ConsultUserPage } from './consult-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultUserPageRoutingModule
  ],
  declarations: [ConsultUserPage]
})
export class ConsultUserPageModule {}
