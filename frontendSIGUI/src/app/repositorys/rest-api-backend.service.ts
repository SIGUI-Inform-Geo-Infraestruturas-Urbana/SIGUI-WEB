import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { IRest } from './rest';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { toStringHDMS } from 'ol/coordinate';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { IRepository } from './repository';
import { FileData } from '../models/file-data.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiBackendService<T,U> implements IRest<T,U>{

  private stringConection = 'http://localhost:8000/';
  constructor(private httpClient: HttpClient) { }

  postData (url :string, dataSpatial : T): Observable<HttpResponse<string>>{   
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }), 
      observe: 'response',   
    }
    // let jsonContent = JSON.stringify(dataSpatial)
    // console.log(jsonContent)
    return this.httpClient
      .post<string>(
        this.stringConection + url,
        dataSpatial,
        {      
          headers : new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
          observe: 'response'
        }       
      )
      // .pipe(retry(1), catchError(this.handleError));
  }
  postDataSimple(url :string, dataSpatial : FormData): Observable<any>{
        return this.httpClient.post( this.stringConection + 'api/data/uploads/',dataSpatial);
  }
  getDataSimple (url :string): Observable<FileData[]>{
    return this.httpClient.get<FileData[]>(this.stringConection + url);
  }

  getData (url :string): Observable<HttpResponse<U>>{
    return this.httpClient.get<U>(this.stringConection + url,{observe: 'response'});
  }
  getDatas (url :string) : Observable<HttpResponse<Array<U>>>{
    return this.httpClient.get<Array<U>>(this.stringConection + url,{observe: 'response'});
  }
  putData (url :string,dataSpatial : T) : Observable<HttpResponse<string>>{
    return this.httpClient.get<string>(this.stringConection + url,{observe: 'response'});
  }
  deleteData (url :string, idParam : string ) : Observable<HttpResponse<string>>{
    return this.httpClient.get<string>(this.stringConection + url,{observe: 'response'});
  }

  handleError(error: any) {
    let errorMessage = '';
    console.log('EROROROROROROROROROROROROR')
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
