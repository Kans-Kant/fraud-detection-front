import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    private userEndPoint = '/user/';

    constructor(private http: HttpClient) { }

    // get user by its id
    getUser() {
        return this.http.get(environment.apiUrl + this.userEndPoint + "me");
    }

    updateUser(user: any) {
        return this.http.put(environment.apiUrl + this.userEndPoint + 'update', user);
    }

    deleteUser(id: number) {
        return this.http.delete(environment.apiUrl + this.userEndPoint + 'delete/' + id);
    }

    updateUserPassword(user: any) {
        return this.http.put(environment.apiUrl + this.userEndPoint + 'update-password', user);
    }

    getUsers() {
        return this.http.get(environment.apiUrl + this.userEndPoint + 'all');
    }

    addUser(userData: any) {
        return this.http.post(environment.apiUrl + this.userEndPoint + 'addUser', userData);
    }

    getUserDetails(id: number) {
        return this.http.get(environment.apiUrl + this.userEndPoint + `details/${id}`);
    }

    ModifyUser(id: string, user: any) {
        return this.http.put(environment.apiUrl + this.userEndPoint + `update/${id}`, user);
    }

}
