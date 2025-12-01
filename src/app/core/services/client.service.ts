import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {


    private clientEndPoint = '/client';

    constructor(private http: HttpClient) { }

    // get client by its id
    getClient(id: number) {
        return this.http.get(environment.apiUrl + this.clientEndPoint + "/" + id);
    }

    addClient(client: any) {
        return this.http.post(environment.apiUrl + this.clientEndPoint, client);
    }

    updateClient(id: string, client: any) {
        return this.http.put(environment.apiUrl + this.clientEndPoint + `/${id}`, client);
    }

    deleteClient(id: number) {
        return this.http.delete(environment.apiUrl + this.clientEndPoint + '/delete/' + id);
    }

    getClients(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.clientEndPoint, { params: params });
    }

}
