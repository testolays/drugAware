import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapReady: boolean = false;
  map: GoogleMap;
  goval: any;
  check: any;
  
  constructor(public navCtrl: NavController, public toastController: ToastController,private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 16.0545666,
          lng: 103.650471
        },
        zoom: 16,
        tilt: 30
      }
    });

   // wait map is ready until maps ready event 
    this.map.one(GoogleMapsEvent.MAP_READY).then(() =>{
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((latLng)=>{
    
        this.showToast(latLng);
        // this.map.addMarker({
        //   title: 'Ionic',
        //   icon: 'blue',
        //   animation: 'DROP',
        //   position: {
        //     lat: 16.0545666,
        //     lng: 103.650471
        //   }
        // });
      });
    });

  }

  btnCheck(){
    this.check = "Ready";
  }

  // onClick(){
  //   if(!this.mapReady){
  //     this.showToast('map is not ready yet. Please try again.');
  //     return;
  //   }

  //   this.map.clear();

  //   // get my location
  //   this.map.getMyLocation().then((location: MyLocation) => {
  //     console.log(JSON.stringify(location, null, 2));

  //     // move map camera to location with animation
  //     return this.map.animateCamera({
  //       target: location.latLng,
  //       zoom: 17,
  //       tilt: 30,
  //       bearing: 140,
  //       duration: 5000
  //     }).then(() =>{
  //       // add marker
  //       return this.map.addMarker({
  //         title: 'reru',
  //         snippet: 'this plugi is awesome!',
  //         position: location.latLng,
  //         animation: GoogleMapsAnimation.BOUNCE
  //       });
  //     })
  //   }).then((marker: Marker) => {
  //     // show the infoWindow
  //     marker.showInfoWindow();

  //     // if clicked it, display alert
  //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=> {
  //       this.showToast('clicked!!!');
  //     });
  //   });
  // }

  showToast(message: string){
    let toast = this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present(toast);
  }

}
