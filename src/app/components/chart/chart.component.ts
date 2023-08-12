import {AfterViewInit, Component, Input} from '@angular/core';
import {SimulacionService} from "../../service/simulacion.service";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit{



  colsNumber:any[]=[];
  dataseleccionada:any[]=[];

  @Input()
  j:number=0;

  constructor(public simulacionService:SimulacionService) {


  }
  listaKeys(){
    return Object.keys(this.simulacionService.listaSimulaciones[0]).filter(value => {
      return value=="majustes" || value=="ln" || value=="vl" || value=="variacion" || value=="percent" || value=="infinito";
    })
  }
  createChartItems(index:any){

    const newdata=this.dataseleccionada.map(value => {

      return {
        label:String(value.item).toUpperCase()=="PERCENT" ? "%":String(value.item).toUpperCase(),
        data:this.simulacionService.listaSimulaciones.map((value1:any) => {

          return parseFloat(value1[value.item]);
        }),
        backgroundColor: value.color,


      }
    })

    console.log(newdata)

    this.chart.data.datasets=newdata;

    this.chart.update();
  }
  getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  selectKey(item: any,index:any) {

    if(this.dataseleccionada.find(value => value.item===item)){
      this.dataseleccionada=this.dataseleccionada.filter(value => value.item!==item);
      this.createChartItems(index);
      return;
    }

    this.dataseleccionada.push({
      item:item,
      color:this.getRandomColor()
    });
    this.createChartItems(index);
  }
  exitKey(item:any){
    return this.dataseleccionada.find(value => value.item===item);
  }

  chart:any;



  createChart(index:any){

    this.chart=new Chart("MyChart"+index, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.simulacionService.listaSimulaciones.map(value => value.ln),
        datasets: [


        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 50,
              usePointStyle: true,
              pointStyle: "circle"
            }
          }
        },
        scales:{
          x: {
            grid: {
              display: false,

            },
            title: {
              display: true,
              text: "Ln (m)",
              color: "red",
              font: {
                size: 24,
                weight: "bold"
              }
            },
            min:0
          },
        }
      },


    });

  }

  ngAfterViewInit(): void {
    this.createChart(this.j)
    this.chart.data.labels=this.simulacionService.listaSimulaciones.map(value => value.ln);
    this.simulacionService.data$.subscribe(value => {


      this.chart.data.labels=this.simulacionService.listaSimulaciones.map(value => value.ln);

    })
  }
}
