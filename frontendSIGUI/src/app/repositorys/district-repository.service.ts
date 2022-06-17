import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { UnitFederalService } from '../services/unity-federal/unit-federal.service';
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

    this.restApiBackend.getData(urlSearch).subscribe((data : HttpResponse<string>) => {
      let featureObject : Feature<Geometry>[] = this.districtService.conversionJson(<string>data.body);
      let cities = this.districtService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<District[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.districtService.conversionJson(<string>data.body);
      console.log(featureObject)
      let units = this.districtService.convertFeature(featureObject);
      console.log(units)
      this._districts.next(units);
    })
    return this.districts$;
  }  

  async createData (district:District):Promise<District>{

    console.log("Create")
    console.log(district)
    if(district.dc_geometry != '0'){
      console.log(district)
      district.dc_geometry = this.districtService.preparObject(<MultiPolygon>district.dc_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,district);
      let a = await firstValueFrom(postSpatial);  
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
