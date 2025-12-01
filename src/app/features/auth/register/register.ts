import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  submitted = false;
  registerForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService, private tokenStorageService: TokenStorageService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getFullName() {
    return this.registerForm.get('fullName')?.value;
  }

  get getEmail() {
    return this.registerForm.get('email')?.value;
  }

  get getPassword() {
    return this.registerForm.get('password')?.value;
  }

  onRegister() {

    const data = {
      "fullName": this.getFullName,
      "email": this.getEmail,
      "password": this.getPassword
    };

    this.authService.register(data).subscribe({
      next: (data: any) => {
        if (data.token) {
          this.tokenStorageService.saveToken(data.token);
          this.router.navigate(['/admin']);
        }
      },
      error: (err: any) => { console.log(err); }
    })
  }
}
