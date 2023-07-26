import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subindice'
})
export class SubindicePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length === 1) {
      return value;
    }

    const firstChar = value[0];
    const restOfString = value.substring(1);

    // Convertir caracteres desde el segundo en adelante en subíndices usando etiquetas HTML
    const subindices = restOfString.split('').map(char => `<sub>${char}</sub>`).join('');

    return `${firstChar}${subindices.toLowerCase()}`;
  }

  private getSubindice(char: string): string {
    const subindiceUnicodeOffset = 8272; // Valor Unicode para el subíndice "₀" (U+2080)
    const charCode = char.charCodeAt(0);
    const subindiceCharCode = subindiceUnicodeOffset + (charCode - 48); // El código Unicode de los dígitos es del 48 al 57

    return String.fromCharCode(subindiceCharCode).toLowerCase();
  }

}
