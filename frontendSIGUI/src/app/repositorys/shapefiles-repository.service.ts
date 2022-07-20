import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { FileData } from '../models/file-data.model';
import { UnitFederal } from '../models/unit-federal.model';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { UnitFederalService } from '../services/unity-federal/unit-federal.service';
import { RestApiBackendService } from './rest-api-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ShapefilesRepositoryService {

  private readonly _units= new BehaviorSubject<FileData[]>([]);
  readonly units$: Observable<FileData[]> = this._units.asObservable();
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

  findFetch():Observable<FileData[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.unitFederalService.conversionJson(<string>data.body);
      console.log(featureObject)
      let units = this.unitFederalService.convertFeature(featureObject);
      console.log(units)
      /////this._units.next(units);
    })
    return this.units$;
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
