import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supindice'
})
export class SupindicePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length === 1) {
      return value;
    }

    const firstChar = value[0];
    const restOfString = value.substring(1);

    // Convertir caracteres desde el segundo en adelante en subíndices usando etiquetas HTML
    const subindices = restOfString.split('').map(char => `<sup>${char}</sup>`).join('');

    return `${firstChar}${subindices.toUpperCase()}`;
  }

  private getSubindice(char: string): string {
    const subindiceUnicodeOffset = 8272; // Valor Unicode para el subíndice "₀" (U+2080)
    const charCode = char.charCodeAt(0);
    const subindiceCharCode = subindiceUnicodeOffset + (charCode - 48); // El código Unicode de los dígitos es del 48 al 57

    return String.fromCharCode(subindiceCharCode).toLowerCase();
  }

}
