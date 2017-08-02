import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  gMap: any;
  mapInfo: any = {
    name: null,
    description: null,
    workspace: null
  };

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public navParams: NavParams) {
    menuCtrl.enable(true);

    if (navParams.get('mapInfo')) {
      this.mapInfo = navParams.get('mapInfo');
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: false
    }

    this.gMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  get isDrawMode() {
    return (this.mapInfo.name !== null);
  }

}
