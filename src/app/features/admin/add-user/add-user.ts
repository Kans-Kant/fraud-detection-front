import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser {

  submitted = false;
  addUserForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.addUserForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get getFullName() {
    return this.addUserForm.get('fullName')?.value;
  }

  get getEmail() {
    return this.addUserForm.get('email')?.value;
  }

  get getPassword() {
    return this.addUserForm.get('password')?.value;
  }

  onAddUser() {

    const data = {
      "fullName": this.getFullName,
      "email": this.getEmail,
      "password": this.getPassword
    };

    this.userService.addUser(data).subscribe({
      next: (data: any) => {
        if (data) {
          this.submitted = true;
          this.toastr.success('Utilisateur ajouté avec succès 🎉', 'Succès');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Echec d’ajout d’utilisateur!!', 'Echec');

      }
    })
  }

}
