import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'thousandSeparator',
  standalone: true,
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number' || isNaN(value)) {
      return '';
    }
    const roundedValue = Math.round(value * 100) / 100;
    const [integerPart, decimalPart] = roundedValue.toFixed(2).split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedDecimalPart = decimalPart && parseInt(decimalPart) !== 0 ? `,${decimalPart}` : '';
    return `$${formattedIntegerPart}${formattedDecimalPart}`;
  }
}
