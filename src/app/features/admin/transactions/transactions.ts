import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  transactions: any[] = [];
  selectedFile!: any;

  constructor(private transactionService: TransactionService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions(this.page, this.size).subscribe({
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
      this.getTransactions();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getTransactions();
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadCsv() {
    if (!this.selectedFile) {
      this.toastr.info("Veuillez choisir un fichier", "Information")
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.transactionService.importTransactionsCsv(formData).subscribe({
      next: (res) => {
        this.selectedFile = null;
        this.toastr.success(res + " Eléments Importés", "Import réussi");
      },
      error: (err) => {
        this.toastr.error("Erreur : " + err.message, "Erreur");
      }
    });
  }

  cancelUpload() {
    this.selectedFile = null;
  }


}
