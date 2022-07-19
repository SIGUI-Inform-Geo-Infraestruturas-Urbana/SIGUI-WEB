import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PointLayer } from './pointLayer';
import { Equipament } from './equipament';
import { County } from '../models/county.model';
import { UnitFederal } from '../models/unit-federal.model'
import { Infraestructura } from './infraestructure';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Feature } from 'ol';
import { District } from '../models/district.model';
import { FileData } from '../models/file-data.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:8000';
  httpOptions!: any;

  constructor(private http: HttpClient) { 
    
  }  

  getDataState(stringSearch : string):Observable<string>{
    return this.http
    .get<string>(this.apiURL + stringSearch)//'/api/data/state/' 
    .pipe(retry(1), catchError(this.handleError));
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

  getState():Observable<string>{
    return this.http
      .get<string>(this.apiURL + '/api/data/state/' );
      //.pipe(retry(1), catchError(this.handleError));
  }  

  setState (stateEntity:UnitFederal):Observable<UnitFederal>{
    console.log(stateEntity)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let jsonContent = JSON.stringify(stateEntity)
    console.log(jsonContent)
    return this.http
      .post<UnitFederal>(
        this.apiURL + '/api/data/state/',
        jsonContent,
        httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getMunicipios(stringConection : string = ''):Observable<string>{
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    return this.http
      .get<string>(this.apiURL + stringConection ,httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  setMunicipios (city:County):Observable<County>{
    console.log(city)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let jsonContent = JSON.stringify(city)
    console.log(jsonContent)
    return this.http
      .post<County>(
        this.apiURL + '/api/data/municipio/',
        jsonContent,
        httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getDistrict():Observable<string>{
    return this.http
      .get<string>(this.apiURL + '/api/data/bairro/' )
      .pipe(retry(1), catchError(this.handleError));
  }  

  setDistrict (district:District):Observable<District>{
    console.log(district)
    let httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    let jsonContent = JSON.stringify(district)
    console.log(jsonContent)
    return this.http
      .post<District>(
        this.apiURL + '/api/data/bairro/',
        jsonContent,
        httpOptions
      )
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
        this.apiURL + '/api/data/infraestrutura/',
        jsonContent,
        httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  
  setUploadFile(formdata: FormData){
    // let jsonContent = JSON.stringify(formdata)
    // console.log(jsonContent)
    return this.http.post( this.apiURL + '/api/data/uploads/',formdata);
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
