import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Sidenav } from '../../shared/sidenav/sidenav';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, Header, Sidenav, CommonModule, MatIconModule, ToastrModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(public loadingService: LoadingService) { }

}
