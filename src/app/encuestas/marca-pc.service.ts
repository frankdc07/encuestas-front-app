import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MarcaPC } from './marca-pc';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaPCService {

  private urlEndPoint: string = 'http://localhost:8080/api/marcasPC';

  constructor(private http: HttpClient,
  private router: Router, private authService: AuthService) { }

  private isNoAutorizado(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getMarcasPC(): Observable<MarcaPC[]> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.get<MarcaPC[]>(this.urlEndPoint, {headers: httpHeaders}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

}
