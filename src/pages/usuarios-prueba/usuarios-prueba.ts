import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController, LoadingController, Loading  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModalAddUsuarioPruebaPage } from '../modal-add-usuario-prueba/modal-add-usuario-prueba'

/**
 * Generated class for the UsuariosPruebaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuarios-prueba',
  templateUrl: 'usuarios-prueba.html',
})
export class UsuariosPruebaPage {
  loading: Loading;
  public listUsuariosPrueba:any;
  public keyAuth:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private rest:RestProvider,public modalCtrl : ModalController,private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariosPruebaPage');
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
    this.getUsuariosPruebas();
  }

  getUsuariosPruebas()
  {
      this.rest.getUsuariosPrueba('',this.keyAuth.access_token).then(data=>{
        this.listUsuariosPrueba = JSON.parse(data + "");
        console.log(data);
      });

  }

  getUsuariosFilter(ev: any) {
     let userValue = ev.target.value;

    this.rest.getUsuariosPrueba(userValue,this.keyAuth.access_token).then(data=>{
      this.listUsuariosPrueba = JSON.parse(data + "");
      console.log(data);
    });

  }

  eliminarItem(userDelete)
  {
    
    this.rest.deleteUsuarioPrueba(userDelete.idUsuario,this.keyAuth.access_token).then(data=>{
      this.showError("Se ha eliminado el usuario");
      this.getUsuariosPruebas();
    });
  }

  OpenModal()
  {
    var modalPage = this.modalCtrl.create(ModalAddUsuarioPruebaPage);
    modalPage.onDidDismiss(data => {
      // Do stuff with the data you closed the modal out with 
      // or do whatever else you need to.
      console.log("se cerró el modal");
      this.getUsuariosPruebas();
    });
    modalPage.present();

  }

  showError(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Usuario Prueba',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
