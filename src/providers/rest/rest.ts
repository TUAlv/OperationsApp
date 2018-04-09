import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class EstadosTenencia {
  id_estado: number;
  nombre_estado: string;
  estatus: boolean;
}

export class modelTenenciasUpd {
  Id_Usuario: string;
  listEstadosTen: Array<EstadosTenencia>=[];
}


@Injectable()
export class RestProvider {
 apiUrl:string;
 userCredentials = { idUsuario: '', password: '' };
 
 

  constructor(private http: Http) {
    this.apiUrl = 'http://10.103.197.151/TU_AUTO/TUAUTO/Web.Api/Initial/';
    //'http://10.103.197.161/TUAUTO/Web.Api/Initial/';
  }

  makelogin(usuario,password)
  {
    
      let headers = new Headers();

      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      let options = new RequestOptions({ headers: headers });
      this.userCredentials.idUsuario = btoa(btoa(usuario));
      this.userCredentials.password = btoa(btoa(password));

      let data = JSON.stringify(this.userCredentials);
      

      return new Promise(resolve => {
        this.http.post(this.apiUrl+"api/AdminServicios/Authenticate", data, options)
        .subscribe(data => {
          
          resolve(data.json());
        }, error => {
          console.log(error);// Error getting the data
        });
      });
      
  }

  getIPAddress() {
    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/')
      .subscribe(data => {
        resolve(data.json());
      });
    });
  }

  getAllTenencias(token){
         let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          
          console.log("getAllTenencias");
          return new Promise(resolve => {
            this.http.get(this.apiUrl+"api/AdminServicios/TenenciaActivaEstados", options)
            .map(res => res.json())
            .subscribe(data => {
              
              resolve(data);
            }, error => {
              console.log(error);// Error getting the data
            });
          });

  }


  changeStatusTenencia(id_estado,status,Id_Usuario,token)
  {
    
      let headers = new Headers();

      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      headers.append('Authorization','Bearer '+token);

      let options = new RequestOptions({ headers: headers });
      
      let model = new modelTenenciasUpd();
          model.Id_Usuario=Id_Usuario;
      let tenencialmodel = new EstadosTenencia();
          tenencialmodel.estatus = status;
          tenencialmodel.id_estado = id_estado;
          
      model.listEstadosTen.push(tenencialmodel);
      

      let data = JSON.stringify(model);
      
      console.log("ActualizaTenencia");
      console.log(data);

      return new Promise(resolve => {
        this.http.post(this.apiUrl+"api/AdminServicios/ActualizaTenencia", data, options)
        .subscribe(data => {
          console.log(data.json());
          resolve();
        }, error => {
          console.log(error);// Error getting the data
        });
      });
      
  }


  getConfigRepuve(token)
  {
          let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          console.log("rest config Repuve");
          
          return new Promise(resolve => {
            this.http.get(this.apiUrl+"api/AdminServicios/ConfiguracionRepuve", options)
            .subscribe(data => {
             // console.log(data.json());
              resolve(data.json());
            }, error => {
              console.log(error);// Error getting the data
            });
          });

  }

  updateRepuveConfig(listaConfigUpd,token){

    let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          
          let model = {id_usuario:'transun',
                      configRepuve: listaConfigUpd
                      };
              
          
          let data = JSON.stringify(model);
          
          console.log("ActualizaRepuveConfig");
          console.log(data);
    
          return new Promise(resolve => {
            this.http.post(this.apiUrl+"api/AdminServicios/ActualizaRepuve", data, options)
            .subscribe(data => {
              console.log(data.json());
              resolve();
            }, error => {
              console.log(error);// Error getting the data
            });
          });
  }


  getHistorialAV(model,token)
  {

    let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          let data = JSON.stringify(model);
          
          console.log("getHistorialAV");
          console.log(data);
    
          return new Promise(resolve => {
            this.http.post(this.apiUrl+"api/AdminServicios/ConsultaAV", data, options)
            .subscribe(data => {
              
              resolve(data.json());
            }, error => {
              console.log(error);// Error getting the data
            });
          });
  }


  getUsuariosPrueba(idUsuarioBuscar,token)
  {

          let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          console.log("rest getUsuariosPrueba");

          let modelFilter = { IdUsuario:""}
          if(idUsuarioBuscar!="" || typeof(idUsuarioBuscar)!=undefined)
          {
             modelFilter.IdUsuario=idUsuarioBuscar;
          }
          
          let info = JSON.stringify(modelFilter);

          return new Promise(resolve => {
            this.http.post(this.apiUrl+"api/AdminServicios/ListaUsuarios",info, options)
            .subscribe(data => {
             
              resolve(data.json());
            }, error => {
              console.log(error);// Error getting the data
            });
          });
  }

  addUsuarioPrueba(idUsuarioPrueba,token)
  {
    let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          
          let model = {IdUsuario:idUsuarioPrueba,UsuarioModifico:"" }
    
          let data = JSON.stringify(model);
          
          
          return new Promise(resolve => {
            this.http.post(this.apiUrl+"api/AdminServicios/InsertaUsuarioTest", data, options)
            .subscribe(data => {
              
              resolve(data.json());
            }, error => {
              console.log(error);// Error getting the data
            });
          });

  }


  deleteUsuarioPrueba(idUsuarioPrueba,token)
  {
    let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          
          let model = {IdUsuario:idUsuarioPrueba,UsuarioModifico:"" }
    
          let data = JSON.stringify(model);
          
          console.log("deleteUserPrueba");
          console.log(data);
    
          return new Promise(resolve => {
            this.http.post(this.apiUrl+"api/AdminServicios/EliminaUsuarioTest", data, options)
            .subscribe(data => {
              console.log(data.json());
              resolve();
            }, error => {
              console.log(error);// Error getting the data
            });
          });

  }

  getInstitucionesF(token)
  {
    let headers = new Headers();
    
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          headers.append('Authorization','Bearer '+token);
    
          let options = new RequestOptions({ headers: headers });
          console.log("rest config Repuve");
          
          return new Promise(resolve => {
            this.http.get(this.apiUrl+"api/AdminServicios/institucionesF", options)
            .subscribe(data => {
             
              resolve(data.json());
            }, error => {
              console.log(error);// Error getting the data
            });
          });

  }


addPrepago(modelPp,token)
{
  let headers = new Headers();
  
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        headers.append('Authorization','Bearer '+token);
  
        let options = new RequestOptions({ headers: headers });
        
       
  
        let data = JSON.stringify(modelPp);
        
        console.log("addPrepago");
        console.log(data);
  
        return new Promise(resolve => {
          this.http.post(this.apiUrl+"api/AdminServicios/PrepagoMobil", data, options)
          .subscribe(data => {
            
            resolve(data.json());
          }, error => {
            console.log(error);// Error getting the data
          });
        });

}

}
