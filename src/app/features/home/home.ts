import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  submitted = false;
  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService, private tokenStorageService: TokenStorageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getEmail() {
    return this.loginForm.get('email')?.value;
  }

  get getPassword() {
    return this.loginForm.get('password')?.value;
  }

  onLogin() {

    const data = {
      "email": this.getEmail,
      "password": this.getPassword
    };

    this.authService.login(data).subscribe({
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
