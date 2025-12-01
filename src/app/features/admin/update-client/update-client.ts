import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-client',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-client.html',
  styleUrl: './update-client.css'
})
export class UpdateClient implements OnInit {

  submitted = false;
  clientForm!: FormGroup;
  clientId: string = "";
  client: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private clientService: ClientService, private toastr: ToastrService) {
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

  ngOnInit(): void {
    const id = this.route.snapshot?.paramMap?.get('id');
    if (id) {
      this.clientId = id;
      this.getMyDetails(id);
    }
  }

  getMyDetails(id: any) {

    this.clientService.getClient(id).subscribe({
      next: (data: any) => {
        this.client = data;
        this.clientForm.patchValue({
          firstName: this.client?.firstName,
          lastName: this.client?.lastName,
          gender: this.client?.gender,
          street: this.client?.street,
          city: this.client?.city,
          country: this.client?.country,
          latitude: this.client?.latitude,
          longitude: this.client?.longitude
        })
      },
      error: (err: any) => { console.log(err); }
    })
  }

  onUpdateClient() {

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

      this.clientService.updateClient(this.clientId, data).subscribe({
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
