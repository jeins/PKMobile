import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Select } from 'ionic-angular';

import { WorkspaceProvider } from '../../providers/petakami/workspace';

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
  drawTypes: any;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public navParams: NavParams, private workspaceProvider: WorkspaceProvider) {
    menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    this.loadMap();

    if (this.navParams.get('mapInfo')) {
      this.mapInfo = this.navParams.get('mapInfo');
      this.loadDrawTypes();
    }
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

  setDrawType() {
    this.drawTypeSection.open();
  }

  loadDrawTypes() {
    this.workspaceProvider
      .getDrawTypes(this.mapInfo.workspace)
      .subscribe(
        result => {
          this.drawTypes = result.map((res) => {
            return res.toLowerCase();
          });
          this.drawType = this.drawTypes[0];
          this.setCoordinates();
          this.enableDrawShapes();
        },
        err => console.error(err)
      );
  }

  setCoordinates() {
    this.mapInfo['coordinates'] = {};

    this.drawTypes.forEach(drawType => {
      this.mapInfo['coordinates'][drawType] = [];
    });
  }

  enableDrawShapes() {
    let coordinate: any;
    
    if (this.drawType === 'point') {
      return google.maps.event.addListener(this.gMap, 'click', (e) => {
        let marker = new google.maps.Marker({
          position: e.latLng,
          map: this.gMap
        });

      });
    }
    else if (this.drawType === 'line') {

    }
    else if (this.drawType === 'polygon') {

    }
  }

  save() {
    console.log(this.mapInfo);
  }
}
