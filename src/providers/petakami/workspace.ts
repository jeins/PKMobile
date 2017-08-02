import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiConfig } from '../configs/api';

@Injectable()
export class WorkspaceProvider {

  constructor(public http: Http, private apiConfig: ApiConfig) {
    console.log('Hello WorkspaceProvider Provider');
  }

  public getWorkspaces() {
    return this.http
      .get(this.apiConfig.API_URL + '/workspace/all')
      .map(res => res.json());
  }

}
