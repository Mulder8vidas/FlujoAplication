import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Chart, registerables } from "chart.js";
import {ApiService} from "../../service/apiservice";
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit{
  public chart: any;

  ngOnInit(): void {


  }

  data:any[]=[];
  keys:any[]=[];
  fco:any[]=[];
  vu:any[]=[];
  vl:any[]=[];
  colsNumber:any[]=[];

  dataseleccionada:any[]=[];

  constructor(private apiService:ApiService) {

  }


  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.colsNumber,
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
              text: "Periodo",
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

   getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  createChartItems(){

    const newdata=this.dataseleccionada.map(value => {

      return {
        label:value.item,
        data:this.data.map(value1 => {
          console.log(value1[value.item]<1)
          return parseFloat(value1[value.item]) < 1.0 ? value1[value.item]*100 : value1[value.item]
        }),
        backgroundColor: value.color,


      }
    })
    console.log(newdata)

   this.chart.data.datasets=newdata;
    this.chart.update();
  }

  createChart2(){

    this.chart = new Chart("MyChart1", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#ECA31C'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#0078D4'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  createChart3(){

    this.chart = new Chart("MyChart2", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#ECA31C'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#0078D4'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  ngAfterViewInit(): void {

    this.apiService.getCajaTabla().subscribe((value:any) => {
      this.data=value;
      if(this.data.length>0){
        this.keys=Object.keys(this.data[0])
        this.colsNumber= Array.from({ length: this.data.length }, (_, index) => index);
        this.vu=this.data.map(value1 => value1.vu);
        this.vl=this.data.map(value1 => value1.vl);
        this.createChart();
        /*this.createChart2();
        this.createChart3();*/
      }
    })


  }

  selectKey(item: any) {

    if(this.dataseleccionada.find(value => value.item===item)){
      this.dataseleccionada=this.dataseleccionada.filter(value => value.item!==item);
      this.createChartItems();
      return;
    }

    this.dataseleccionada.push({
      item:item,
      color:this.getRandomColor()
    });
    this.createChartItems();
  }
  exitKey(item:any){
    return this.dataseleccionada.find(value => value.item===item);
  }
}
