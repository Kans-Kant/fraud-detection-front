import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css'
})
export class UpdateUser implements OnInit {

  submitted = false;
  userForm!: FormGroup;
  userId: string = "";
  user: any;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getFullName() {
    return this.userForm.get('fullName')?.value;
  }

  get getEmail() {
    return this.userForm.get('email')?.value;
  }

  get getPassword() {
    return this.userForm.get('password')?.value;
  }

  ngOnInit(): void {
    const id = this.route.snapshot?.paramMap?.get('id');
    if (id) {
      this.userId = id;
      this.getMyDetails(id);
    }
  }

  getMyDetails(id: any) {

    this.userService.getUserDetails(id).subscribe({
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
      "fullName": this.getFullName,
      "email": this.getEmail,
      "password": this.getPassword
    };

    this.userService.ModifyUser(this.userId, data).subscribe({
      next: (data: any) => {
        if (data) {
          this.submitted = true;
          this.toastr.success('Utilisateur modifié avec succès 🎉', 'Succès');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Echec de modification d’utilisateur!!', 'Echec');

      }
    })
  }

}
