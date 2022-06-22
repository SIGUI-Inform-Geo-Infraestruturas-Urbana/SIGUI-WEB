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

@Injectable({
  providedIn: 'root'
})
export class SubsystemRepositoryService implements IRepository<Subsystem,Subsystem>{

  private readonly _subsystems= new BehaviorSubject<Subsystem[]>([]);
  readonly subsystems$: Observable<Subsystem[]> = this._subsystems.asObservable();
  private stringConection = 'api/data/subsistemas/';

  constructor(private restApiBackend: RestApiBackendService<Subsystem,Subsystem>,
    private subsystemService : SubsystemService, private dataSpatialService : DataSpatialService ) { }

  findFetchData(idParam : number = 0):boolean{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection + idParam.toString();
    }
    else
    {
      urlSearch = this.stringConection;
    }

    this.restApiBackend.getData(urlSearch).subscribe((data : HttpResponse<Subsystem>) => {
      // let featureObject : Feature<Geometry>[] = this.subsystemService.conversionJson(<string>data.body);
      // let cities = this.subsystemService.convertFeature(featureObject);
      // this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<Subsystem[]>{//Observable<string>
    this.restApiBackend.getDatas(this.stringConection).subscribe((data : HttpResponse<Array<Subsystem>>) => {
      let bodys : Subsystem[]= <Subsystem[]>data.body;
      console.log(bodys)
      this._subsystems.next(bodys);
    })
    return this.subsystems$;
  }  

  async createData (street:Subsystem):Promise<Subsystem>{

    // console.log("Create")
    // console.log(street)
    // if(street.st_geometry != '0'){
    //   console.log(street)
    //   street.st_geometry = this.subsystemService.preparObject(<LineString>street.st_geometry);
    //   let postSpatial = this.restApiBackend.postData(this.stringConection,street);
    //   let a = await firstValueFrom(postSpatial);  
    // }    
  
   return new Subsystem;
  }
  changeData (dataSpatial : Subsystem): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
