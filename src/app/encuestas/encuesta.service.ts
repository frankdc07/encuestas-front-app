import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Encuesta } from './encuesta';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private urlEndPoint: string = 'http://localhost:8080/api/encuestas';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient,
  private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader(): HttpHeaders {
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  crearEncuesta(encuesta: Encuesta): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.urlEndPoint, encuesta, {headers: this.agregarAuthorizationHeader()});
  }

  descartar(id: number): Observable<Encuesta> {
    return this.http.delete<Encuesta>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()});
  }

}
