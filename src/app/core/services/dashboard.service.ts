import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DashboardService {

    private dashboardEndPoint = '/dashboard';

    constructor(private http: HttpClient) { }

    getCounts() {
        return this.http.get(environment.apiUrl + this.dashboardEndPoint + '/counts');
    }

    getFraudStats() {
        return this.http.get(environment.apiUrl + this.dashboardEndPoint + '/fraud-stats');
    }
}
