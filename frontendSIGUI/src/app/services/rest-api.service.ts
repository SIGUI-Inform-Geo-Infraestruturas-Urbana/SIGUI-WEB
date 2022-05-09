import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PointLayer } from './pointLayer';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPoits(): Observable<PointLayer> {
    return this.http
      .get<PointLayer>(this.apiURL + '/poits')
      .pipe(retry(1), catchError(this.handleError));
  }
  getPoit(id:any): Observable<PointLayer> {
    return this.http
      .get<PointLayer>(this.apiURL + '/poits/' + id)
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
