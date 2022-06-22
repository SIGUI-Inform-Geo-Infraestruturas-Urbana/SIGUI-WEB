import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon, Point } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { IRepository } from './repository';
import { Infrastructure } from '../models/infrastructure.model';
import { InfrastructureService } from '../services/infrastructure/infrastructure.service';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureRepositoryService implements IRepository<Infrastructure,Infrastructure>{

  private readonly _infrastructure= new BehaviorSubject<Infrastructure[]>([]);
  readonly infrastructure$: Observable<Infrastructure[]> = this._infrastructure.asObservable();
  private stringConection = 'api/data/infraestrutura/';

  constructor(private restApiBackend: RestApiBackendService<Infrastructure,string>,private infrastructureService : InfrastructureService,
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
      let featureObject : Feature<Geometry>[] = this.infrastructureService.conversionJson(<string>data.body);
      let cities = this.infrastructureService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<Infrastructure[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.infrastructureService.conversionJson(<string>data.body);
      console.log(featureObject)
      let streets = this.infrastructureService.convertFeature(featureObject);
      console.log(streets)
      this._infrastructure.next(streets);
    })
    return this.infrastructure$;
  }  

  async createData (infra:Infrastructure):Promise<Infrastructure>{

    console.log("Create")
    console.log(infra)
    if(infra.infra_geometry != '0'){
      console.log(infra)
      infra.infra_geometry = this.infrastructureService.preparObject(<Point>infra.infra_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,infra);
      let a = await firstValueFrom(postSpatial); 
      let featureObject : Feature<Geometry> = this.infrastructureService.conversionJsonObject(<string>a.body); 
      let infras = new Infrastructure().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;
    } 
    else
    {
      console.log(infra)
      let postSpatial = this.restApiBackend.postData(this.stringConection,infra);
      let a = await firstValueFrom(postSpatial); 
      let featureObject : Feature<Geometry> = this.infrastructureService.conversionJsonObject(<string>a.body); 
      let infras = new Infrastructure().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;
    }   
  
   return new Infrastructure;
  }
  changeData (dataSpatial : Infrastructure): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
