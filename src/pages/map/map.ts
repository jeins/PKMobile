import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Select } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('drawTypeSection') drawTypeSection: Select;
  gMap: any;
  mapInfo: any = {
    name: null,
    description: null,
    workspace: null
  };
  drawType: string;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public navParams: NavParams) {
    menuCtrl.enable(true);

    if (navParams.get('mapInfo')) {
      this.mapInfo = navParams.get('mapInfo');
      this.drawType = "point";
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }
  
  loadMap() {
    let latLng = new google.maps.LatLng(-0.4055727193536711, 116.19846321160155);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.gMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  get isDrawMode() {
    return (this.mapInfo.name !== null);
  }

  setDrawType(){
    this.drawTypeSection.open();
  }

  save(){}
}
