import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css'
})
export class Sidenav {

}
