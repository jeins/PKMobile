import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AbstractPetaKami } from './abstract.pk';
import { ApiConfig } from '../configs/api';

@Injectable()
export class LayerProvider extends AbstractPetaKami {

  constructor(public http: Http, public apiConfig: ApiConfig) {
    super(apiConfig);
    console.log('Hello LayerProvider Provider');
  }

  public addLayer(data) {
    return this.http
      .post(`${this.apiConfig.API_URL}/layer/add`, data, this.requestHeader())
      .map(res => res.json());
  }

  public addUserLayer(data){
      return this.http
      .post(`${this.apiConfig.API_URL}/ulayer/add`, data, this.requestHeader())
      .map(res => res.json());
  }
}
