import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RepuvePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repuve',
  templateUrl: 'repuve.html',
})
export class RepuvePage {
public listaConfigRepuve:any;
listaCopy:any;
public keyAuth:any;

  constructor(public navCtrl: NavController,private rest:RestProvider, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepuvePage');
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
    this.getConfigRepuve();
  }

    getConfigRepuve(){

      this.rest.getConfigRepuve(this.keyAuth.access_token).then(data=>{
          this.listaConfigRepuve = JSON.parse(data + "");
          //console.log(this.listaConfigRepuve);
          this.listaConfigRepuve.forEach(element => {
            if(element.descripcion == 'ESTATUS' || element.descripcion == "ESTATUS_TRACE" || element.descripcion == "PLACAS_ESTATUS_TRACE")
              element.valor= element.valor=='1'?true:false;
        });
      });
    }

    updateConfigRepuve(){

      this.listaCopy = this.listaConfigRepuve;

      this.listaCopy.forEach(element => {
        if(element.descripcion == 'ESTATUS' || element.descripcion == "ESTATUS_TRACE" || element.descripcion == "PLACAS_ESTATUS_TRACE")
          element.valor= element.valor==true?'1':'0';
      });
      
      console.log(this.listaCopy);

        this.rest.updateRepuveConfig(this.listaCopy,this.keyAuth.access_token).then(data=>{
              this.showMessage("Se actualizó la configuración de Repuve");
        });

      
    }

    showMessage(text) {
      
     let alert = this.alertCtrl.create({
       title: '',
       subTitle: text,
       buttons: ['OK']
     });
     alert.present();
   }
}
