import {AfterViewInit, Component} from '@angular/core';
import {listaSimulacion, SimulacionService} from "../../service/simulacion.service";
import {Chart, registerables} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(...registerables);
Chart.register(zoomPlugin);
@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements AfterViewInit{


  datasets:any[]=[];
  constructor(private simulacionService:SimulacionService) {


    this.ajustes=this.simulacionService.listAllSimulaciones[0].listaAjustes.filter(a=>a.majustes!="%").map(value => {
      return value.majustes;
    });
    this.datasets=this.simulacionService.listAllSimulaciones;

  }

  createDataset(data:listaSimulacion[]){

    return data.map(value => {
      return {
        label: value.nombreSimulacion,
        data: value.listaAjustes.map(value1=>value1.percent*100),
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),// Color del borde
        borderWidth: 0.4,// Ancho del borde
      }

    })

  }

  getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  chart:any;
  ajustes:any[]=[];

  createChart(){

    this.chart=new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.ajustes,
        datasets: this.createDataset(this.datasets)
      },
      options: {
        aspectRatio:3,
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0, // general animation time
          delay: 0, // animation delay
          easing: 'easeOutQuart', // animation effect
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 50,
              usePointStyle: true,
              pointStyle: "circle"
            }
          },
          zoom:{
           zoom: {
              wheel: {
                enabled: true,
              },
             pinch: {
                enabled: true
             },
             mode: 'y',
             drag: {
                enabled: true
             },
             scaleMode: 'y',


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
              text: "M ajustes",
              color: "red",
              font: {
                size: 24,
                weight: "bold"
              }
            },
            min:0
          },
          y:{
            beginAtZero: true,
          }
        }
      },


    });

  }

  ngAfterViewInit(): void {

    this.createChart();
  }

}
