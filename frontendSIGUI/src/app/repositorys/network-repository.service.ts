import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { IRepository } from './repository';
import { Street } from '../models/street.model';
import { StreetService } from '../services/street/street.service';
import { Subsystem } from '../models/subsystem.model';
import { SubsystemService } from '../services/subsystem/subsystem.service';
import { Network } from '../models/network.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkRepositoryService implements IRepository<Network,Network>{

  private readonly _networks= new BehaviorSubject<Network[]>([]);
  readonly networks$: Observable<Network[]> = this._networks.asObservable();
  private stringConection = 'api/data/rede/';

  constructor(private restApiBackend: RestApiBackendService<Network,Network>,
    private subsystemService : SubsystemService) { }

  findFetchData(idParam : number = 0):boolean{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection + idParam.toString();
    }

    this.restApiBackend.getData(urlSearch).subscribe((data : HttpResponse<Network>) => {
      // let featureObject : Feature<Geometry>[] = this.subsystemService.conversionJson(<string>data.body);
      // let cities = this.subsystemService.convertFeature(featureObject);
      // this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<Network[]>{//Observable<string>
    this.restApiBackend.getDatas(this.stringConection).subscribe((data : HttpResponse<Array<Network>>) => {
      let bodys : Network[]= <Network[]>data.body;
      console.log(bodys)
      this._networks.next(bodys);
    })
    return this.networks$;
  }  

  async createData (street:Network):Promise<Network>{

    // console.log("Create")
    // console.log(street)
    // if(street.st_geometry != '0'){
    //   console.log(street)
    //   street.st_geometry = this.subsystemService.preparObject(<LineString>street.st_geometry);
    //   let postSpatial = this.restApiBackend.postData(this.stringConection,street);
    //   let a = await firstValueFrom(postSpatial);  
    // }    
  
   return new Network;
  }
  changeData (dataSpatial : Network): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
