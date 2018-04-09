import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenenciasPage } from './tenencias';

@NgModule({
  declarations: [
    TenenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(TenenciasPage),
  ],
})
export class TenenciasPageModule {}
