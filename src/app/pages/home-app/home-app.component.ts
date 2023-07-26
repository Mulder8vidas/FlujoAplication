import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router,} from '@angular/router';
import {ApiService} from "../../service/apiservice";
import {DecimalPipe} from "@angular/common";


@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent {

  FormCalculo = new FormGroup({
    flujoanual: new FormControl('', Validators.required),
    ku: new FormControl('', Validators.required),
    kd: new FormControl('', Validators.required),
    xt: new FormControl('', Validators.required),
    Yinput: new FormControl('', Validators.required),
    taños: new FormControl('', Validators.required),
    gInpunt: new FormControl('', Validators.required),

    majustes: new FormControl('', Validators.required),
    tTotal: new FormControl({value: '', disabled: true}),
    gmInpunt: new FormControl({value: '', disabled: true}),
    yminput: new FormControl({value: '', disabled: true}),
    fTotales: new FormControl({value: '', disabled: true}),
    fTotal: new FormControl({value: '', disabled: true}),
    ku1: new FormControl({value: '', disabled: true}),
    kd1: new FormControl({value: '', disabled: true}),
    xt1: new FormControl({value: '', disabled: true}),
    timpuestos: new FormControl('', Validators.required),
  })
  displayModal: boolean;

  constructor(private router: Router, private apiService: ApiService,private decimalPipe: DecimalPipe) {
    this.displayModal = false
  }

  clear() {
    this.FormCalculo.reset()
  }

  dashboard() {
    window.open('/dashboard', '_blank');
  }


  infinito() {

    this.router.navigate(['/home-infinito']);
  }

  calcular() {
    this.apiService.dataentrada = {
      "flujo_anual": this.FormCalculo.getRawValue().flujoanual,
      "ku": Number(this.FormCalculo.getRawValue().ku) / 100,
      "kd": Number(this.FormCalculo.getRawValue().kd) / 100,
      "xt": Number(this.FormCalculo.getRawValue().xt) / 100,
      "yde": this.FormCalculo.getRawValue().Yinput,
      "taños": this.FormCalculo.getRawValue().taños,
      "crecimiento_anual": Number(this.FormCalculo.getRawValue().gInpunt) / 100,
      "majustes": this.FormCalculo.getRawValue().majustes,
      "tasaimpuesto": Number(this.FormCalculo.getRawValue().timpuestos) / 100
    }
    this.calcularData();

    localStorage.setItem("data", JSON.stringify(this.apiService.dataentrada))
    window.open('/caja-finito', '_blank');

  }

  calcularData() {
    let data = this.apiService.dataentrada

    this.FormCalculo.controls["fTotal"].setValue(String(data.flujo_anual * (1 + data.crecimiento_anual) * (Math.pow((1 + data.crecimiento_anual), data.taños) - 1) / (data.crecimiento_anual)));
    this.FormCalculo.controls["tTotal"].setValue(String(data.majustes * data.taños));
    this.FormCalculo.controls["gmInpunt"].setValue(String(Math.pow((1 + data.crecimiento_anual), (1 / data.majustes)) - 1));
    this.FormCalculo.controls["yminput"].setValue(String(parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt) / data.crecimiento_anual * Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), (data.majustes - 1))));
    this.FormCalculo.controls["fTotales"].setValue(String(data.flujo_anual * (parseFloat(<string>this.FormCalculo.getRawValue().yminput)) * (1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)) * (Math.pow((Math.pow((1 + parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)), data.majustes)), data.taños) - 1) / parseFloat(<string>this.FormCalculo.getRawValue().gmInpunt)));
    this.FormCalculo.controls["ku1"].setValue(String(Math.pow((1 + data.ku), (1 / data.majustes)) - 1));
    this.FormCalculo.controls["kd1"].setValue(String(Math.pow((1 + data.kd), (1 / data.majustes)) - 1));
    this.FormCalculo.controls["xt1"].setValue(String(Math.pow((1 + data.ku), (1 / data.majustes)) - 1));


    this.applyFormat('flujo_anual',2)


    this.applyFormat('gmInpunt',6)
    this.applyFormat('yminput',6)
    this.applyFormat('ku1',6)
    this.applyFormat('kd1',6)
    this.applyFormat('xt1',6)
    this.applyFormat('fTotal',2)
    this.applyFormat('fTotales',2)

  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate([''])
  }

  applyFormat(controlName: string,decimal:number) {
    const control = this.FormCalculo.get(controlName);
    if (control && control.value !== null) {
      const parsedValue = this.parseInput(control.value);
      const formattedValue = this.formatValue(parsedValue,decimal);
      console.log(controlName)
      console.log(formattedValue)
      control.setValue(formattedValue, { emitEvent: false });
    }
  }

  private parseInput(value: string): number {
    return parseFloat(value.replace(/,/g, ''));
  }



  private formatValue(value: number,decimal:number): string {
    return this.decimalPipe.transform(value, '1.2-'+decimal) || '';
  }
}
