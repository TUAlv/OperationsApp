import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import {HomePage} from '../home/home'
import {TabsTuPage } from '../tabs-tu/tabs-tu'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  userCredentials = { idUsuario: '', password: '' };
  responseAutenticate:any;
  
  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private rest:RestProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading()

    this.rest.makelogin(this.userCredentials.idUsuario,this.userCredentials.password).then(data => {
      
      var listAuth = JSON.parse(data + ""); 

      if(typeof(listAuth.access_token)!=undefined && listAuth.access_token!="")
      {  
        this.nav.push(TabsTuPage,{objAuth:data});
      }
      else
      {
         this.showError("Ocurrió un error, contacte al administrador");
      }

    }).catch(ex =>{
      this.showError("Ocurrió un error, contacte al administrador")
    });

    //this.nav.push(TabsTuPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    //alert.present(prompt);
  }
}

