import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FraudService {


    private fraudEndPoint = '/fraud/';

    constructor(private http: HttpClient) { }

    // get fraud by its id

    getFrauds() {
        return this.http.get(environment.apiUrl + this.fraudEndPoint + 'all');
    }

}
