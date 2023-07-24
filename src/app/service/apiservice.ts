import {LoginModel} from "../model/loginModel";
import {BehaviorSubject, Observable} from "rxjs";
import {RespuestaModel} from "../model/respuestaModel";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ApiUrl} from "./api";
import {ReunionModel} from "../model/reunion";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlLogin=ApiUrl()+'/auth/login'
  private urlRegistro=ApiUrl()+'/auth/registrar'
  private urlPub ='http://localhost:8080/publicacion'
  logeadoUser=new BehaviorSubject(false);
  constructor(private http: HttpClient) { }
  login(data:LoginModel):Observable<RespuestaModel>{
    return this.http.post<RespuestaModel>(this.urlLogin,data);
  }
  public registrar(data:any):Observable<any>{
    return this.http.post(this.urlRegistro,data);
  }
  public registrarPub(data:any):Observable<any>{
    return this.http.post(this.urlPub,data);
  }

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(ApiUrl()+"/reunion/usuarios");
  }

  createReunion(data:ReunionModel):Observable<any>{
    return this.http.post(ApiUrl()+"/reunion",data);
  }

  deleteById(id:any):Observable<any>{
    return this.http.delete(ApiUrl()+"/reunion/usuarios/"+id)
  }

  misReuniones(){
    return this.http.get(ApiUrl()+"/reunion");
  }
  enviarMensaje(data:any):Observable<any>{
    return this.http.post(ApiUrl()+"/mensaje",data)
  }

  findByIdReunion(data:any){
    return this.http.get(ApiUrl()+"/reunion/"+data);
  }

  public getPublicar():Observable<any>{
    return this.http.get<any>(this.urlPub)

  }

  public getCajaTabla(){


    // @ts-ignore
    return this.http.post(ApiUrl()+"/caja",JSON.parse(localStorage.getItem("data")));

  }


  public dataentrada:any;
  public datainfientrada:any;




}
