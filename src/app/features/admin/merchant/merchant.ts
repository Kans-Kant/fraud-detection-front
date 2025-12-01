import { Component } from '@angular/core';
import { MerchantService } from '../../../core/services/merchant.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-merchant',
  imports: [CommonModule],
  templateUrl: './merchant.html',
  styleUrl: './merchant.css'
})
export class Merchant {


  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  merchants: any[] = [];

  constructor(private merchantService: MerchantService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  getMerchants() {
    this.merchantService.getMerchants(this.page, this.size).subscribe({
      next: (data: any) => {
        console.log(data?.content);
        this.merchants = data?.content;
        this.totalPage = data?.totalPages;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  onNextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.getMerchants();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getMerchants();
    }
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
        this.merchantService.deleteMerchant(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.merchants = this.merchants?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showMerchantDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails Merchant',
        id: id,
        fetchFn: (id: number) => this.merchantService.getMerchant(id)
      }
    });
  }

}
