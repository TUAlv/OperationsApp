import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { ChannelService, ConnectionState } from '../../providers/channel-service/channel-service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  connectionState$: Observable<string>;

  constructor(public navCtrl: NavController,private channelService: ChannelService) {
          this.connectionState$ = this.channelService.connectionState$
          .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
  }


  ionViewDidLoad() {
    console.log('Starting the channel service');
          
         // this.channelService.start();

     
  }


 

}
