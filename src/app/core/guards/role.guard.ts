import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const authToken = this.tokenStorage.getToken();

        if (!authToken) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
