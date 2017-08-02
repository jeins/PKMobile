import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WorkspaceProvider } from '../../providers/petakami/workspace';

@IonicPage()
@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})
export class DrawPage {
  public workspaces: any;
  public map: any = {
    name: null,
    description: null,
    workspace: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public workspaceProvider: WorkspaceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawPage');

    this.loadWorkspaces();
  }

  loadWorkspaces() {
    this.workspaceProvider
      .getWorkspaces()
      .subscribe(
        result => this.workspaces = result,
        err => console.error(err)
      );
  }

  draw(){
    this.navCtrl.push('MapPage', {mapInfo: this.map});
  }

  get isAllowedToDraw(){
    return (this.map.workspace === null );
  }
}
