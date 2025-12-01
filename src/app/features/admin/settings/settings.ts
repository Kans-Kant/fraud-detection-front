import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {

  user?: User;
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private tokenService: TokenStorageService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getMyDetails();
  }

  getMyDetails() {

    this.userService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
        this.userForm.patchValue({
          email: this.user?.email,
          fullName: this.user?.fullName
        })
      },
      error: (err: any) => { console.log(err); }
    })
  }

  onUpdateUser() {
    
    const data = {
      "fullName": this.userForm.get('fullName')?.value,
      "email": this.userForm.get('email')?.value,
      "password": this.userForm.get('password')?.value
    };

    this.userService.updateUser(data).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data) {
          this.tokenService.signout();
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => { console.log(err); }
    })
  }
}
