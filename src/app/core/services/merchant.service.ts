import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MerchantService {


    private merchantEndPoint = '/merchant';

    constructor(private http: HttpClient) { }

    // get merchant by its id
    getMerchant(id: number) {
        return this.http.get(environment.apiUrl + this.merchantEndPoint + "/" + id);
    }

    updateMerchant(card: any) {
        return this.http.put(environment.apiUrl + this.merchantEndPoint + '/update', card);
    }

    deleteMerchant(id: number) {
        return this.http.delete(environment.apiUrl + this.merchantEndPoint + '/delete/' + id, { responseType: 'text' });
    }

    getMerchants(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.merchantEndPoint, { params: params });
    }

}
