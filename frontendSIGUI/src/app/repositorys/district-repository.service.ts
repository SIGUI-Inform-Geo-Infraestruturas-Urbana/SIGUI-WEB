import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { BehaviorSubject, firstValueFrom, Observable, Observer, throwError } from 'rxjs';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { UnitFederalService } from '../services/unit-federal/unit-federal.service';
import { UnitFederal } from '../models/unit-federal.model';
import { DistrictService } from '../services/district/district.service';
import { District } from '../models/district.model';
import { IRepository } from './repository';

@Injectable({
  providedIn: 'root'
})
export class DistrictRepositoryService implements IRepository<District,District>{

  private readonly _districts= new BehaviorSubject<District[]>([]);
  readonly districts$: Observable<District[]> = this._districts.asObservable();
  private stringConection = 'api/data/bairro/';

  constructor(private restApiBackend: RestApiBackendService<District,string>,private districtService : DistrictService,
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
      let featureObject : Feature<Geometry>[] = this.districtService.conversionJson(<string>data.body);
      let cities = this.districtService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  populateServiceViewMap(cities : District[]){
    this.dataSpatialService.setDataSpatial(cities);
  }

  // findFetch():Observable<District[]>{//Observable<string>
  //   this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
  //     console.log(data)
  //     let featureObject : Feature<Geometry>[] = this.districtService.conversionJson(<string>data.body);
  //     console.log(featureObject)
  //     let units = this.districtService.convertFeature(featureObject);
  //     console.log(units)
  //     this._districts.next(units);
  //   })
  //   return this.districts$;
  // }  

  findFetch(idParam : number = 0):Observable<District[]>{//Feature<Geometry>
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
        let featureObject : Feature<Geometry>[] = this.districtService.conversionJson(<string>response.body);
        let units = this.districtService.convertFeature(featureObject);
        console.log(units)
        this._districts.next(units);
      },
      error: (err) => {
        console.log(err);
        this._districts.error(err);
      },
    });
    return this.districts$;
  }

  postData (district:District):Observable<District>{

    return new Observable((observer: Observer<District>) => {
      console.log("Create")
      console.log(district)
      //  if(district.dc_geometry != '0'){
      district.dc_geometry = this.districtService.preparObject(<MultiPolygon>district.dc_geometry);

      this.restApiBackend.postData(this.stringConection,district).subscribe({
       next: (response : HttpResponse<string>) => {
         console.log(response);
         let featureObject : Feature<Geometry> = this.districtService.conversionJsonObject(<string>response.body); 
         let districts = new District().deserialize(featureObject);
         console.log('DITRITO cRIAdo')
         observer.next(districts);
         observer.complete();
       },
       error: (err) => {
         console.log(err);
         observer.error(err);
       },
     }); 
    }); 
  }

  editData (distric:District):Observable<District>{
    return new Observable((observer: Observer<District>) => {});
  }

  async createData (district:District):Promise<District>{

    console.log("Create")
    console.log(district)
    if(district.dc_geometry != '0'){
      console.log(district)
      district.dc_geometry = this.districtService.preparObject(<MultiPolygon>district.dc_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,district);
      let a = await firstValueFrom(postSpatial);  
      let featureObject : Feature<Geometry> = this.districtService.conversionJsonObject(<string>a.body); 
      let infras = new District().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;
    }    
  
   return new District;
  }
  changeData (dataSpatial : District): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
