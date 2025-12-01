import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    private authEndPoint = '/auth/';

    constructor(private http: HttpClient) { }

    login(loginData: any) {
        return this.http.post(environment.apiUrl + this.authEndPoint + "login", loginData);
    }

    register(registerData: any) {
        return this.http.post(environment.apiUrl + this.authEndPoint + "register", registerData);
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getUserRole(): string {
        const user = this.getCurrentUser();
        return user?.role || '';
    }

    isLoggedIn(): boolean {
        return !!this.getCurrentUser();
    }

}
