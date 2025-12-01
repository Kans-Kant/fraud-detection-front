import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'uf',
  standalone: true,
})
export class UniversalFormatPipe implements PipeTransform {

  private datePipe = new DatePipe('fr-FR');

  transform(value: any): any {
    if (value === null || value === undefined) return '—';

    // Date
    if (value instanceof Date || typeof value === 'string' && !isNaN(Date.parse(value))) {
      return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm');
    }

    // Number (montants)
    if (typeof value === 'number') {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }

    // Boolean
    if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }

    // Enum or any string
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    // Simple object (ex: { id: 1, name: 'X' })
    if (typeof value === 'object') {
      if ('id' in value || 'name' in value) {
        return value.name ?? ('ID: ' + value.id);
      }
      return '[Objet]';
    }

    return value;
  }
}
