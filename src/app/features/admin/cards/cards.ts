import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardService } from '../../../core/services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { DetailsDialog } from '../../../shared/details-dialog/details-dialog';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export class Cards {

  page: number = 0;
  size: number = 50;
  totalPage: number = 25;
  cards: any[] = [];

  constructor(private cardService: CardService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cardService.getCards(this.page, this.size).subscribe({
      next: (data: any) => {
        this.cards = data?.content;
        this.totalPage = data?.totalPages;
      },
      error: (err: any) => { console.log(err); }
    });
  }

  onNextPage() {
    if (this.page < this.totalPage) {
      this.page++;
      this.getCards();
    }
  }

  onPreviousPage() {
    if (this.page >= 1) {
      this.page--;
      this.getCards();
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
        this.cardService.deleteCard(id).subscribe({
          next: (data: any) => {
            this.toastr.success('Opération exécutée avec succès 🎉', 'Succès');
            this.cards = this.cards?.filter(t => t.id !== id);
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Une erreur est survenue!!', 'Erreur')
          }
        })
      }
    });
  }

  showCardDetails(id: number) {
    this.dialog.open(DetailsDialog, {
      width: '450px',
      data: {
        title: 'Détails Card',
        id: id,
        fetchFn: (id: number) => this.cardService.getCard(id)
      }
    });
  }

}
