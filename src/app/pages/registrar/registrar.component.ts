import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../service/apiservice";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  users:any
  FormRegistro= new FormGroup({
    username :new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    nombre:new FormControl(),
    apellido:new FormControl()
  })

  constructor(private service:ApiService,private messageService:MessageService) {

  }

  guardar(){
    let data=this.FormRegistro.getRawValue();
    this.service.registrar(data).subscribe(value => {
      this.messageService.add({severity:'success', summary: 'Success', detail: value.respuesta});

    })
  }
  loadUsers(){
    this.service.getAllUsers().subscribe(value => {
      this.users=value;

    })
  }
}
