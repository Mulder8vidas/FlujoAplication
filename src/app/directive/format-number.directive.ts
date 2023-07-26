import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {

   decimalDigits: number = 2; // Number of decimal digits

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2, private decimalPipe: DecimalPipe) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const parsedValue = this.parseInput(value);
    this.formatValue(parsedValue);
  }

  private parseInput(value: string): number {
    return parseFloat(value.replace(/,/g, '')); // Remove commas globally
  }

  private formatValue(value: number) {
    const formattedValue = this.decimalPipe.transform(value, `1.${this.decimalDigits}-${this.decimalDigits}`);
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

}
