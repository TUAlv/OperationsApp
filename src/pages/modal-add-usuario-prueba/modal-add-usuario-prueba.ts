import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ModalAddUsuarioPruebaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-usuario-prueba',
  templateUrl: 'modal-add-usuario-prueba.html',
})
export class ModalAddUsuarioPruebaPage {
  public idUsuarioPrueba:string="";
  public keyAuth:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController,private rest:RestProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAddUsuarioPruebaPage');
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  addUserPrueba()
  {
    console.log(this.idUsuarioPrueba);
    this.rest.addUsuarioPrueba(this.idUsuarioPrueba,this.keyAuth.access_token).then(data=>{ 
      var resp = JSON.parse(data + "");
      
             switch(resp.actionStatus)
             {
                case 0: this.showMessage("Ocurrió un error, consulte al administrador"); break;
                case 3: this.showMessage("El usuario de prueba ha sido agregado exitosamente"); 
                        this.closeModal();
                        break;
                case 4: this.showMessage("Ya existe el usuario que se desea agregar"); 
                        
                        break;
                case 5: this.showMessage("El id no esta permitido"); break;
             }
      
    });
  }

  showMessage(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Usuario Prueba',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
