import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BankService {


    private bankEndPoint = '/bank';

    constructor(private http: HttpClient) { }

    // get bank by its id
    getBank(id: number) {
        return this.http.get(environment.apiUrl + this.bankEndPoint + "/" + id);
    }

    updateBank(card: any) {
        return this.http.put(environment.apiUrl + this.bankEndPoint + '/update', card);
    }

    deleteBank(id: number) {
        return this.http.delete(environment.apiUrl + this.bankEndPoint + '/delete/' + id, { responseType: 'text' });
    }

    getBanks(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.bankEndPoint, { params: params });
    }

}
