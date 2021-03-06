import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Observer, throwError } from 'rxjs';
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon, Point } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { IRepository } from './repository';
import { Infrastructure } from '../models/infrastructure.model';
import { InfrastructureService } from '../services/infrastructure/infrastructure.service';
import { InfrastructureNetwork } from '../models/Infrastructure-network.model';
import { InfrastructureNetworkService } from '../services/InfrastructureNetwork/InfrastructureNetwork';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureNetworkRepositoryService implements IRepository<InfrastructureNetwork,InfrastructureNetwork>{

  private readonly _infrastructure= new BehaviorSubject<InfrastructureNetwork[]>([]);
  readonly infrastructure$: Observable<InfrastructureNetwork[]> = this._infrastructure.asObservable();
  private stringConection = 'api/data/infrarede/';

  constructor(private restApiBackend: RestApiBackendService<InfrastructureNetwork,string>,private infrastructureService : InfrastructureNetworkService,
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

  // findFetch():Observable<InfrastructureNetwork[]>{//Observable<string>
  //   this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
  //     console.log(data)
  //     let featureObject : Feature<Geometry>[] = this.infrastructureService.conversionJson(<string>data.body);
  //     console.log(featureObject)
  //     let streets = this.infrastructureService.convertFeature(featureObject);
  //     console.log(streets)
  //     this._infrastructure.next(streets);
  //   })
  //   return this.infrastructure$;
  // } 
  
  populateServiceViewMap(cities : InfrastructureNetwork[]){
    this.dataSpatialService.insertData(cities);
  }

  findFetch(idParam : number = 0):Observable<InfrastructureNetwork[]>{//Feature<Geometry>
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
        let featureObject : Feature<Geometry>[] = this.infrastructureService.conversionJson(<string>response.body);
        console.log(featureObject)
        let streets = this.infrastructureService.convertFeature(featureObject);
        console.log(streets)
        this._infrastructure.next(streets);
      },
      error: (err) => {
        console.log(err);
        this._infrastructure.error(err);
      },
      complete : () => {
        this._infrastructure.complete();
      }
    });
    return this.infrastructure$;
  }

  postData (infra:InfrastructureNetwork):Observable<InfrastructureNetwork>{

    return new Observable((observer: Observer<InfrastructureNetwork>) => {
      console.log("Create")
      console.log(infra)
      infra.infra_geometry = this.infrastructureService.preparObject(<Point>infra.infra_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,infra)
      .subscribe({
       next: (response : HttpResponse<string>) => {
         console.log(response);
         let featureObject : Feature<Geometry> = this.infrastructureService.conversionJsonObject(<string>response.body); 
         let infras = new InfrastructureNetwork().deserialize(featureObject);
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

  editData (equip:InfrastructureNetwork):Observable<InfrastructureNetwork>{
    return new Observable((observer: Observer<InfrastructureNetwork>) => {});
  }


  async createData (infra:InfrastructureNetwork):Promise<InfrastructureNetwork>{

    console.log("Create")
    console.log(infra)
    if(infra.infra_geometry != '0'){
      console.log(infra)
      infra.infra_geometry = this.infrastructureService.preparObject(<Point>infra.infra_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,infra);
      let a = await firstValueFrom(postSpatial); 
      let featureObject : Feature<Geometry> = this.infrastructureService.conversionJsonObject(<string>a.body); 
      let infras = new InfrastructureNetwork().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras;
    }    
  
   return new InfrastructureNetwork;
  }
  changeData (dataSpatial : InfrastructureNetwork): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
