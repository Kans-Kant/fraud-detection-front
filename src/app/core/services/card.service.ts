import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CardService {


    private cardEndPoint = '/card';

    constructor(private http: HttpClient) { }

    // get user by its id
    getCard(id: number) {
        return this.http.get(environment.apiUrl + this.cardEndPoint + `/${id}`);
    }

    updateCard(card: any) {
        return this.http.put(environment.apiUrl + this.cardEndPoint + '/update', card);
    }

    deleteCard(id: number) {
        return this.http.delete(environment.apiUrl + this.cardEndPoint + '/delete/' + id);
    }

    getCards(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.cardEndPoint, { params: params });
    }

}
