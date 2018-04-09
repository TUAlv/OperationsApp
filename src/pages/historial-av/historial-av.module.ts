import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialAvPage } from './historial-av';

@NgModule({
  declarations: [
    HistorialAvPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialAvPage),
  ],
})
export class HistorialAvPageModule {}
