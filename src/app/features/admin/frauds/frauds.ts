import { Component } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-frauds',
  imports: [CommonModule],
  templateUrl: './frauds.html',
  styleUrl: './frauds.css'
})
export class Frauds {

  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  transactions: any[] = [];

  constructor(private transactionService: TransactionService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFrauds();
  }

  getFrauds() {
    this.transactionService.getFrauds(this.page, this.size).subscribe({
      next: (data: any) => {
        this.transactions = data?.content;
        this.totalPage = data?.totalPages;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  onNextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.getFrauds();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getFrauds();
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
        this.transactionService.deleteTransaction(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.transactions = this.transactions?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showTransactionDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails Transaction',
        id: id,
        fetchFn: (id: number) => this.transactionService.getTransaction(id)
      }
    });
  }

  exportToCsv() {
    this.transactionService.downloadFraudsCsv().subscribe((csv: Blob) => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(csv);

      a.href = url;
      a.download = 'transaction-frauds.csv';
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

}
