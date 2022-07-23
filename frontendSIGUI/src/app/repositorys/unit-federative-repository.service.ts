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
import { IRepository } from './repository';

@Injectable({
  providedIn: 'root'
})
export class UnitFederativeRepositoryService implements IRepository<UnitFederal,UnitFederal>{

  private readonly _units= new BehaviorSubject<UnitFederal[]>([]);
  readonly units$: Observable<UnitFederal[]> = this._units.asObservable();
  private stringConection = 'api/data/state/';

  constructor(private restApiBackend: RestApiBackendService<UnitFederal,string>,private unitFederalService : UnitFederalService,
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
      let featureObject : Feature<Geometry>[] = this.unitFederalService.conversionJson(<string>data.body);
      let cities = this.unitFederalService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  // findFetch():Observable<UnitFederal[]>{//Observable<string>
  //   this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
  //     console.log(data)
  //     let featureObject : Feature<Geometry>[] = this.unitFederalService.conversionJson(<string>data.body);
  //     console.log(featureObject)
  //     let units = this.unitFederalService.convertFeature(featureObject);
  //     console.log(units)
  //     this._units.next(units);
  //   })
  //   return this.units$;
  // }  

  populateServiceViewMap(cities : UnitFederal[]){
    this.dataSpatialService.setDataSpatial(cities);
  }

  findFetch(idParam : number = 0):Observable<UnitFederal[]>{//Feature<Geometry>
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
        let featureObject : Feature<Geometry>[] = this.unitFederalService.conversionJson(<string>response.body);
        console.log(featureObject)
        let units = this.unitFederalService.convertFeature(featureObject);
        console.log(units)
        this._units.next(units);
      },
      error: (err) => {
        console.log(err);
        this._units.error(err);
      },
    });
    return this.units$;
  }

  postData (unit:UnitFederal):Observable<UnitFederal>{

    return new Observable((observer: Observer<UnitFederal>) => {
      console.log("Create")
      console.log(unit)
      // if(unit.uf_geometry != '0'){
        console.log(unit)
        unit.uf_geometry = this.unitFederalService.preparObject(<MultiPolygon>unit.uf_geometry);
        let postSpatial = this.restApiBackend.postData(this.stringConection,unit).subscribe({
         next: (response : HttpResponse<string>) => {
         console.log(response);
         let featureObject : Feature<Geometry> = this.unitFederalService.conversionJsonObject(<string>response.body); 
         let infras = new UnitFederal().deserialize(featureObject);
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

  async createData (unit:UnitFederal):Promise<UnitFederal>{

    console.log("Create")
    console.log(unit)
    if(unit.uf_geometry != '0'){
      console.log(unit)
      unit.uf_geometry = this.unitFederalService.preparObject(<MultiPolygon>unit.uf_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,unit);
      let a = await firstValueFrom(postSpatial);  
      let featureObject : Feature<Geometry> = this.unitFederalService.conversionJsonObject(<string>a.body); 
      let infras = new UnitFederal().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;
    }
    
    
  
   return new UnitFederal;
  }
  changeData (dataSpatial : UnitFederal): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
