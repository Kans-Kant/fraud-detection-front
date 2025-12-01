import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  username : string = "";

  constructor(private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    const data = this.tokenService.decodeToken();
    this.username = data?.sub;
  }

  logOut() {
    this.tokenService.signout();
    this.router.navigate(['./']);
  }

  isLogged() {
    return true;
  }

  onSetting() {
    this.router.navigate(['./settings']);
  }

}
