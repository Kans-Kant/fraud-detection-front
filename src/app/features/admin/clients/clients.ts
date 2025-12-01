import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients {

  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  clients: any[] = [];

  constructor(private clientService: ClientService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients(this.page, this.size).subscribe({
      next: (data: any) => {
        this.clients = data?.content;
        this.totalPage = data?.totalPages;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  onNextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.getClients();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getClients();
    }
  }

  onFilter(sortedBy: string) {
    console.log(sortedBy);
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Supprimer cet item',
        message: 'Voulez-vous vraiment supprimer cet item ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.clients = this.clients?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showClientDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails Client',
        id: id,
        fetchFn: (id: number) => this.clientService.getClient(id)
      }
    });
  }

}
