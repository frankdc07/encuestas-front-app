import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from "./usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  constructor(private http: HttpClient) { }

  public get token(): string {
    if (this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      return sessionStorage.getItem('token');
    }
    return null;

  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint: string = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp:12345');
    const httpHeaders: HttpHeaders = new HttpHeaders({'content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

  guardarToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  estaAutenticado(): boolean {
    if (this.token != null){
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    sessionStorage.clear();
  }

}
