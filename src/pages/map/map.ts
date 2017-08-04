import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Select, Platform  } from 'ionic-angular';

import { WorkspaceProvider } from '../../providers/petakami/workspace';
import { LayerProvider } from '../../providers/petakami/layer';

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

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, public navParams: NavParams,
    private workspaceProvider: WorkspaceProvider, private layerProvider: LayerProvider
  ) {
    this.menuCtrl.enable(true);
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
    let me = this;
    let gDrawTypes = this.drawTypes.map((dType) => {
      if (dType === 'point') return 'marker';
      else if (dType === 'linestring') return 'polyline';
      else return 'polygon';
    });

    let drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: gDrawTypes
      },
      markerOptions: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "black",
          fillOpacity: 1,
          strokeColor: 'grey',
          strokeWeight: .1,
          scale: 5
        }
      }
    });
    drawingManager.setMap(this.gMap);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
      if (e.type === 'marker') {
        let coordinates = e.overlay.getPosition();

        me.mapInfo.coordinates.point.push([coordinates.lat(), coordinates.lng()]);
      } else if (e.type === 'polyline') {
        let coordinates = me.extractPathCoordinate(e.overlay.getPath().getArray());

        me.mapInfo.coordinates.linestring.push(coordinates);
      } else if (e.type === 'polygon') {
        let coordinates = me.extractPathCoordinate(e.overlay.getPath().getArray());

        me.mapInfo.coordinates.polygon.push([coordinates]);
      }
    });
  }

  extractPathCoordinate(pathCoordinates) {
    let resultCoordinate = [];

    pathCoordinates.forEach((c) => {
      resultCoordinate.push([c.lat(), c.lng()]);
    });

    return resultCoordinate;
  }

  save() {
    this.mapInfo.name += 'ionic';

    this.layerProvider.addUserLayer({
      name: this.mapInfo.name, description: this.mapInfo.description, workspace: this.mapInfo.workspace
    }).subscribe(
      result => {
        console.log(result);
        console.log("berhasil add ulayer");
      },
      err => console.error(err)
      );

    Object.keys(this.mapInfo.coordinates).map((dType) => {
      if (this.mapInfo.coordinates[dType].length === 0) {
        delete this.mapInfo.coordinates[dType];
      }
    });


    this.layerProvider.addLayer(this.mapInfo)
      .subscribe(
      result => {
        console.log(result);
        console.log("berhasil");
      },
      err => console.error(err)
      )
  }
}
