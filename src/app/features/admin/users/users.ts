import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { ToastrService } from 'ngx-toastr';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users?: any[] = [];

  constructor(private userService: UserService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {

    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err: any) => { console.log(err); }
    })
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Supprimer cet item',
        message: 'Voulez-vous vraiment supprimer cet item ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.users = this.users?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showUserDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails utilisateur',
        id: id,
        fetchFn: (id: number) => this.userService.getUserDetails(id)
      }
    });
  }

}
