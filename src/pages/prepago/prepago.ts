import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PrepagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prepago',
  templateUrl: 'prepago.html',
})
export class PrepagoPage {
  public prepagoModel = { cantidad_transacciones_contratadas:0,fecha_inicio:"",fecha_fin:"",id_institucion:1 };
  public keyAuth:any;
  public listaInstitucionesF:any;
  public myDate: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private rest:RestProvider,private alertCtrl: AlertController) {
    this.myDate = (new Date()).toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrepagoPage');
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
    this.getAllInstituciones();
  }

  getAllInstituciones()
  {
    this.rest.getInstitucionesF(this.keyAuth.access_token).then(data=>{
      this.listaInstitucionesF = JSON.parse(data + "");
      console.log(this.listaInstitucionesF);
    });
  }

  prepagoAdd(){
     console.log(this.prepagoModel);
     this.rest.addPrepago(this.prepagoModel,this.keyAuth.access_token).then(data=>{
       //{"actionStatus":4,"errorMessage":null,"status":0,"statusId":0
       var resp = JSON.parse(data + "");

       switch(resp.actionStatus)
       {
          case 0: this.showMessage("Ocurrió un error, consulte al administrador"); break;
          case 3: this.showMessage("La solicitud del prepago ha sido agregada exitosamente"); 
                  this.prepagoModel.cantidad_transacciones_contratadas = 0;
                  this.prepagoModel.fecha_fin="";
                  this.prepagoModel.fecha_inicio="";
                  this.prepagoModel.id_institucion=1;
                  break;
          case 4: this.showMessage("Ya existe una configuración de prepago activa para esa institución"); 
                  
                  break;
          case 5: this.showMessage("El id de la institución no esta permitido"); break;
       }
       
      
    });
  }

  showMessage(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Prepago',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
