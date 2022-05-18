import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PointLayer } from './pointLayer';
import { Equipament } from './equipament';
import { Infraestructura } from './infraestructure';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:8000';
  httpOptions!: any;

  constructor(private http: HttpClient) { 

  }  

  getPoits(): Observable<PointLayer> {
    return this.http
      .get<PointLayer>(this.apiURL + '/poits')
      .pipe(retry(1), catchError(this.handleError));
  }
  getPoit(id:any): Observable<PointLayer> {
    return this.http
      .get<PointLayer>(this.apiURL + '/equipaments/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  setEquipament(equipament:Equipament):Observable<Equipament>{
    console.log(equipament)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let content = {
      equipament : equipament
    }
    let jsonContent = JSON.stringify(content)
    console.log(jsonContent)
    return this.http
      .post<Equipament>(
        this.apiURL + '/api/equipament/',
        jsonContent,
        httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  setPoint(infraestructura:Infraestructura):Observable<Infraestructura>{
    console.log(infraestructura)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let jsonContent = JSON.stringify(infraestructura)
    console.log(jsonContent)
    return this.http
      .post<Infraestructura>(
        this.apiURL + '/api/infra/',
        jsonContent,
        httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}