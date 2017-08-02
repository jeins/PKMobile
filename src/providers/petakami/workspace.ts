import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AbstractPetaKami } from './abstract.pk';
import { ApiConfig } from '../configs/api';

@Injectable()
export class WorkspaceProvider extends AbstractPetaKami {

  constructor(public http: Http, public apiConfig: ApiConfig) {
    super(apiConfig);
    console.log('Hello WorkspaceProvider Provider');
  }

  public getWorkspaces() {
    return this.http
      .get(`${this.apiConfig.API_URL}/workspace/all`)
      .map(res => res.json());
  }


  public getDrawTypes(workspace){
    return this.http
      .get(`${this.apiConfig.API_URL}/workspace/${workspace}/draw`, this.requestHeader())
      .map(res => res.json());
  }

}
