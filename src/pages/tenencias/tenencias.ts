import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../../pages/login/login'
import { HomePage} from '../../pages/home/home'
/**
 * Generated class for the TenenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenencias',
  templateUrl: 'tenencias.html',
})
export class TenenciasPage {
  public tenenciasDes:any;
  public keyAuth:any;
  private rootPage;
  private homePage;
  private catsPage;
  private dogsPage;

  constructor(public navCtrl: NavController,private rest:RestProvider, public navParams: NavParams,private alertCtrl: AlertController) {
    this.rootPage = HomePage;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenenciasPage');
    
    this.keyAuth = JSON.parse( document.getElementById('paramAuthToken').innerHTML);
   console.log(this.keyAuth);
   
   if(this.keyAuth)
     this.getAllTenencias();
    else
      this.navCtrl.push(LoginPage);
  }

  getAllTenencias()
  {
    this.rest.getAllTenencias(this.keyAuth.access_token).then(data => {
      this.tenenciasDes = JSON.parse(data + "");
      
    }).catch(ex =>{
      this.showMessage("Ocurrió un error, contacte al administrador");
    });
  }

  updateTenencia(item)
  {
    console.log("updateTenencia");
    console.log(item);
    this.rest.changeStatusTenencia(item.id_estado,item.estatus,'transun',this.keyAuth.access_token).then(data=>{
      this.showMessage("Se actualizó el estatus de la tenencia");
    }).catch(exc=>{ this.showMessage("Ocurrió un error, contacte al administrador"); } );
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
