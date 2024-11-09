import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

import { ProfesorHomePage } from './profesor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    RouterModule.forChild([{ path: '', component: ProfesorHomePage }])
  ],
  declarations: [ProfesorHomePage]
})
export class ProfesorHomePageModule {}
