import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the HistorialAvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial-av',
  templateUrl: 'historial-av.html',
})
export class HistorialAvPage {
  public consultasAV={ nDias:16,Vin:"" }
  public historialAVDetalle:any;
  public keyAuth:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private rest:RestProvider,) {
  }

  ionViewDidLoad() {
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
    console.log('ionViewDidLoad HistorialAvPage');
  }

  makeHistorial(){

    console.log(this.consultasAV);
    this.rest.getHistorialAV(this.consultasAV,this.keyAuth.access_token).then(data=>{
         
          this.historialAVDetalle = JSON.parse(data + "");
    });
  }
}
