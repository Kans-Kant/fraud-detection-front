import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {


    private transactionEndPoint = '/transaction';

    constructor(private http: HttpClient) { }

    // get bank by its id
    getTransaction(id: number) {
        return this.http.get(environment.apiUrl + this.transactionEndPoint + "/" + id);
    }

    updateTransaction(card: any) {
        return this.http.put(environment.apiUrl + this.transactionEndPoint + '/update', card);
    }

    deleteTransaction(id: number) {
        return this.http.delete(environment.apiUrl + this.transactionEndPoint + '/delete/' + id, { responseType: 'text' });
    }

    getTransactions(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.transactionEndPoint, { params: params });
    }

    getFrauds(page: number, size: number) {
        let params = new HttpParams();
        params.set("page", page);
        params.set("size", size);
        return this.http.get(environment.apiUrl + this.transactionEndPoint+"/fraud", { params: params });
    }

    downloadFraudsCsv() {
        return this.http.get(environment.apiUrl + this.transactionEndPoint + '/export-frauds', { responseType: 'blob' });
    }

    importTransactionsCsv(form: FormData) {
        return this.http.post(environment.apiUrl + this.transactionEndPoint + '/import-transactions', form);
    }

}
