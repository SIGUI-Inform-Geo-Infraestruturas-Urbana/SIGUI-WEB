import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { BehaviorSubject, firstValueFrom, Observable, Observer, throwError } from 'rxjs';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { IRepository } from './repository';
import { Street } from '../models/street.model';
import { StreetService } from '../services/street/street.service';

@Injectable({
  providedIn: 'root'
})
export class StreetRepositoryService implements IRepository<Street,Street>{

  private readonly _sreets= new BehaviorSubject<Street[]>([]);
  readonly street$: Observable<Street[]> = this._sreets.asObservable();
  private stringConection = 'api/data/street/';

  constructor(private restApiBackend: RestApiBackendService<Street,string>,private streetService : StreetService,
    private dataSpatialService : DataSpatialService ) { }

  findFetchData(idParam : number = 0):boolean{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection + idParam.toString();
    }
    else
    {
      urlSearch = this.stringConection;
    }

    this.restApiBackend.getData(urlSearch).subscribe((data : HttpResponse<string>) => {
      let featureObject : Feature<Geometry>[] = this.streetService.conversionJson(<string>data.body);
      let cities = this.streetService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  // findFetch():Observable<Street[]>{//Observable<string>
  //   this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
  //     console.log(data)
  //     let featureObject : Feature<Geometry>[] = this.streetService.conversionJson(<string>data.body);
  //     console.log(featureObject)
  //     let streets = this.streetService.convertFeature(featureObject);
  //     console.log(streets)
  //     this._sreets.next(streets);
  //   })
  //   return this.street$;
  // } 
  
  findFetch(idParam : number = 0):Observable<Street[]>{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection + idParam.toString();
    }
    else
    {
      urlSearch = this.stringConection;
    }

    this.restApiBackend.getData(urlSearch)
    //.pipe(catchError(()=> { return  throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (response : HttpResponse<string>) => {
        console.log(response)
        let featureObject : Feature<Geometry>[] = this.streetService.conversionJson(<string>response.body);
        console.log(featureObject)
        let streets = this.streetService.convertFeature(featureObject);
        console.log(streets)
        this._sreets.next(streets);
      },
      error: (err) => {
        console.log(err);
        this._sreets.error(err);
      },
    });
    return  this.street$;
  }

  postData (street:Street):Observable<Street>{

    return new Observable((observer: Observer<Street>) => {
      console.log("Create")
      console.log(street)
     // if(street.st_geometry != '0'){
       // console.log(street)
        street.st_geometry = this.streetService.preparObject(<LineString>street.st_geometry);
         this.restApiBackend.postData(this.stringConection,street).subscribe({
          next: (response : HttpResponse<string>) => {
          console.log(response);
          let featureObject : Feature<Geometry> = this.streetService.conversionJsonObject(<string>response.body); 
          let infras = new Street().deserialize(featureObject)
          console.log('cRIAdo')
          observer.next(infras);
          observer.complete();
          },
          error: (err) => {
            console.log(err);
            observer.error(err);
          },
     }); 
    }); 
   }  

  async createData (street:Street):Promise<Street>{

    console.log("Create")
    console.log(street)
    if(street.st_geometry != '0'){
      console.log(street)
      street.st_geometry = this.streetService.preparObject(<LineString>street.st_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,street);
      let a = await firstValueFrom(postSpatial);
      let featureObject : Feature<Geometry> = this.streetService.conversionJsonObject(<string>a.body); 
      let infras = new Street().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;  
    }    
  
   return new Street;
  }
  changeData (dataSpatial : Street): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
