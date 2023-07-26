import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginModel} from "../../model/loginModel";
import {ApiService} from "../../service/apiservice";
import {Router} from "@angular/router";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  form= new FormGroup({
    email :new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)]),
    password:new FormControl('',Validators.required)
  })

  constructor(private formBuilder: FormBuilder,
              private adminService : ApiService,
              private router : Router,
              private readonly utilService: UtilService,) {}


  Login(){

    let usuario=this.form.controls.email.value;
    let clave=this.form.controls.password.value;

    let data:LoginModel={
      username:usuario==null ? "":usuario,
      password:clave==null ? "":clave
    }
    alert("ingresando")
    this.adminService.login(data).subscribe((value:any) => {
      alert(value.message);
      if(value.success){

        this.utilService.currentUser = value;
        /*this.router.navigate(['/home'])*/
      }else{

        this.adminService.logeadoUser.next(false)

      }



    })


  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    this.convertToBase64(file);

  }
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;


      this.base64image=base64String;
    };
    reader.onerror = (error) => {
      console.log('Error al convertir la imagen a Base64:', error);
    };
  }

  base64image:string="";
  registrar(){
    this.router.navigate(["/registrar"])
  }

  ngOnInit(): void {

   /* if(localStorage.getItem("eyJ-Aa5.sq4x38fw191&_xy7x:70x")!=null){
      this.router.navigate(["/home"])
    }*/
  }
}
