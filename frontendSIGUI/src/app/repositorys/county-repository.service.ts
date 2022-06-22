import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
// import { Repository } from '../services/shared/repository/repository';
import { IRepository } from './repository';
import { RestApiBackendService } from './rest-api-backend.service';
import { CountyService } from '../services/count/county.service';
import { DataSpatialService } from '../services/count/data-spatials.service';

@Injectable({
  providedIn: 'root'
})
export class CountyRepositoryService implements IRepository<County,County> {

  private readonly _counties = new BehaviorSubject<County[]>([]);
  readonly counties$: Observable<County[]> = this._counties.asObservable();
  private stringConection = 'api/data/municipio/';

  constructor(private restApiBackend: RestApiBackendService<County,string>,private countyService : CountyService,
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
      let featureObject : Feature<Geometry>[] = this.countyService.conversionJson(<string>data.body);
      let cities = this.countyService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<County[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log('DEV')
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.countyService.conversionJson(<string>data.body);
      console.log('DAP')
      console.log(data)
       console.log('DUP')
      let cities = this.countyService.convertFeature(featureObject);
      this._counties.next(cities);
    })
    return this.counties$;
  }

  async createData (city:County):Promise<County>{

    console.log("Create")
    console.log(city)
    city.co_geometry = this.countyService.preparObject(<MultiPolygon>city.co_geometry);
    let postSpatial = this.restApiBackend.postData(this.stringConection,city);
    let a = await firstValueFrom(postSpatial); 
    let featureObject : Feature<Geometry> = this.countyService.conversionJsonObject(<string>a.body); 
      let infras = new County().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras; 
  
   return new County;
  }
  changeData (dataSpatial : County): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }




}
