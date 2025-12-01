import { Component } from '@angular/core';
import { BankService } from '../../../core/services/bank.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-banks',
  imports: [CommonModule, DatePipe],
  templateUrl: './banks.html',
  styleUrl: './banks.css'
})
export class Banks {

  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  banks: any[] = [];

  constructor(private bankService: BankService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks() {
    this.bankService.getBanks(this.page, this.size).subscribe({
      next: (data: any) => {
        this.banks = data?.content;
        this.totalPage = data?.totalPages;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  onNextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.getBanks();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getBanks();
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
        this.bankService.deleteBank(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.banks = this.banks?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showBankDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails Bank',
        id: id,
        fetchFn: (id: number) => this.bankService.getBank(id)
      }
    });
  }

}
