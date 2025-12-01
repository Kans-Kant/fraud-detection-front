import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UniversalFormatPipe } from '../pipe/universal-format-pipe';

@Component({
  selector: 'app-details-dialog',
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, UniversalFormatPipe],
  templateUrl: './details-dialog.html',
  styleUrl: './details-dialog.css'
})
export class DetailsDialog implements OnInit {

  loading = true;
  entries: { key: string; value: any }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailsDialog>,
  ) { }

  ngOnInit() {
    this.data.fetchFn(this.data.id).subscribe({
      next: (entity: any) => {
        this.loading = false;
        this.entries = Object.keys(entity)
          .filter(k => !this.isInternalField(k))
          .map(key => ({
            key,
            value: entity[key]
          }));

      },
      error: () => this.loading = false
    });
  }

  private isInternalField(field: string): boolean {
    return ['password', 'createdAt', 'updatedAt', '__v'].includes(field);
  }

}
