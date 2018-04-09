import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams  } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login'
import { AutoLogoutService } from './logoutSession'
/**
 * Generated class for the TabsTuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-tu',
  templateUrl: 'tabs-tu.html'
})
export class TabsTuPage {

  public objAuth: string ="";
  tenenciasRoot = 'TenenciasPage'
  repuveRoot = 'RepuvePage'
  historialAvRoot = 'HistorialAvPage'
  usuariosPruebaRoot = 'UsuariosPruebaPage'
  prepagoRoot = 'PrepagoPage'


  constructor(public navCtrl: NavController,public navParams: NavParams, public autologout:AutoLogoutService) {
    this.objAuth= this.navParams.get('objAuth');
    console.log(this.objAuth);
    
    this.autologout.navTabs=navCtrl;
    if(this.objAuth == "" && typeof(this.objAuth)== null)
    {

    }
  }

 /*
  StartTimer(){
   console.log("set start timer");
    setTimeout(() => {
     this.redirectLogin();
  }, 5000);  //5s

  }

  redirectLogin()
  {
    this.navCtrl.push(LoginPage);
  }*/
}
