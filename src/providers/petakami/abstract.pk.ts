import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { ApiConfig } from '../configs/api';

@Injectable()
export class AbstractPetaKami {
    constructor(public apiConfig: ApiConfig) {}

    public requestHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.apiConfig.API_TOKEN);

        let options = new RequestOptions({ headers: headers });

        return options;
    }
}
