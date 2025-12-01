import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {

    private jwtHelper = new JwtHelperService();
    constructor() { }

    signout() {
        window.localStorage.clear();
    }


    public saveToken(token: string) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken() {
        return window.localStorage.getItem(TOKEN_KEY);
    }


    decodeToken(): any | null {
        const token = this.getToken();
        if (!token) return null;
        return this.jwtHelper.decodeToken(token);
    }

    public saveUser(user: any) {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser() {
        return JSON.parse(window.localStorage.getItem(USER_KEY)!);
    }
}
