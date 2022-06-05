import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { Observable, throwError } from 'rxjs';
import { City } from '../models/city.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

@Injectable({
  providedIn: 'root'
})
export class CountyRepositoryService {
  private stringConection = 'http://localhost:8000/api/data/municipio/';
  constructor(private httpClient: HttpClient) { }

  findFetchCounty(idParam : string = ''):Observable<string>{//Feature<Geometry>
    return this.httpClient.get<string>(this.stringConection + idParam);
  }

  fetchCountys(){
    return this.httpClient.get<any>(this.stringConection);
  }

  createCounty (city:City):Observable<City>{
    console.log(city)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let jsonContent = JSON.stringify(city)
    console.log(jsonContent)
    return this.httpClient
      .post<City>(
        this.stringConection + '/api/data/municipio/',
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
