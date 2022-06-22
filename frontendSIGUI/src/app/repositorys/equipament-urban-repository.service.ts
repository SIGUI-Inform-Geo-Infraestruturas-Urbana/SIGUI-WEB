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
import { EquipmentUrban } from '../models/equipament-urban.model';
import { EquipamentUrbanService } from '../services/equipamentUrban/equipamentUrban.service';

@Injectable({
  providedIn: 'root'
})
export class EquipamentUrbanRepositoryService implements IRepository<EquipmentUrban,EquipmentUrban>{

  private readonly _equipament= new BehaviorSubject<EquipmentUrban[]>([]);
  readonly equipament$: Observable<EquipmentUrban[]> = this._equipament.asObservable();
  private stringConection = 'api/data/equipament/';

  constructor(private restApiBackend: RestApiBackendService<EquipmentUrban,string>,private equipamentUrbanService : EquipamentUrbanService,
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
      let featureObject : Feature<Geometry>[] = this.equipamentUrbanService.conversionJson(<string>data.body);
      let cities = this.equipamentUrbanService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<EquipmentUrban[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.equipamentUrbanService.conversionJson(<string>data.body);
      console.log(featureObject)
      let streets = this.equipamentUrbanService.convertFeature(featureObject);
      console.log(streets)
      this._equipament.next(streets);
    })
    return this.equipament$;
  }  

  async createData (equiUrban:EquipmentUrban):Promise<EquipmentUrban>{

    console.log("Create")
    console.log(equiUrban)
    if(equiUrban.geometry != '0'){
      console.log(equiUrban)
      equiUrban.co_geometry = this.equipamentUrbanService.preparObject(<Point>equiUrban.co_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,equiUrban);
      let a = await firstValueFrom(postSpatial); 
      let featureObject : Feature<Geometry> = this.equipamentUrbanService.conversionJsonObject(<string>a.body); 
      let infras = new EquipmentUrban().deserialize(featureObject);
      console.log('createsucesse')
      //console.log(infras)
      return infras; 
    }    
  
   return new EquipmentUrban;
  }
  changeData (dataSpatial : EquipmentUrban): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
