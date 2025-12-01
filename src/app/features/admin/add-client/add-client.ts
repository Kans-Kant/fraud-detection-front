import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css'
})
export class AddClient {

  submitted = false;
  clientForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private clientService: ClientService, private toastr: ToastrService) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });
  }


  onAddClient() {

    const data = {
      "firstName": this.clientForm.get('firstName')?.value,
      "lastName": this.clientForm.get('lastName')?.value,
      "gender": this.clientForm.get('gender')?.value,
      "street": this.clientForm.get('street')?.value,
      "city": this.clientForm.get('city')?.value,
      "country": this.clientForm.get('country')?.value,
      "latitude": this.clientForm.get('latitude')?.value,
      "longitude": this.clientForm.get('longitude')?.value
    };

    if (this.clientForm.valid) {

      this.clientService.addClient(data).subscribe({
        next: (data: any) => {
          if (data) {
            this.submitted = true;
            this.toastr.success('Client ajouté avec succès 🎉', 'Succès');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error('Echec d’ajout de client !!', 'Echec');

        }
      })
    } else {
      this.toastr.error('Formulaire invalide !!', 'Echec');
    }
  }

}
