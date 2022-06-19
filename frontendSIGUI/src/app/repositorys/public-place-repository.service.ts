import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
import { County } from '../models/county.model';
import { retry, catchError } from 'rxjs/operators'
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon } from 'ol/geom';
import { RestApiBackendService } from './rest-api-backend.service';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { IRepository } from './repository';
import { Street } from '../models/street.model';
import { StreetService } from '../services/street/street.service';
import { PublicPlace } from '../models/public-place.model';
import { PublicPlaceService } from '../services/public-place/publicplace.service';

@Injectable({
  providedIn: 'root'
})
export class PublicPlaceRepositoryService implements IRepository<PublicPlace,PublicPlace>{

  private readonly _publicplace= new BehaviorSubject<PublicPlace[]>([]);
  readonly publicplace$: Observable<PublicPlace[]> = this._publicplace.asObservable();
  private stringConection = 'api/data/logradouro/';

  constructor(private restApiBackend: RestApiBackendService<PublicPlace,string>,private publicPlaceService : PublicPlaceService,
    private dataSpatialService : DataSpatialService ) { }

  findFetchData(idParam : number = 0):boolean{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection + idParam.toString();
    }

    this.restApiBackend.getData(urlSearch).subscribe((data : HttpResponse<string>) => {
      let featureObject : Feature<Geometry>[] = this.publicPlaceService.conversionJson(<string>data.body);
      let cities = this.publicPlaceService.convertFeature(featureObject);
      this.dataSpatialService.setDataSpatial(cities);
    })
    return true;
  }

  findFetch():Observable<PublicPlace[]>{//Observable<string>
    this.restApiBackend.getData(this.stringConection).subscribe((data : HttpResponse<string>) => {
      console.log(data)
      let featureObject : Feature<Geometry>[] = this.publicPlaceService.conversionJson(<string>data.body);
      console.log(featureObject)
      let streets = this.publicPlaceService.convertFeature(featureObject);
      console.log(streets)
      this._publicplace.next(streets);
    })
    return this.publicplace$;
  }  

  async createData (publicPlace:PublicPlace):Promise<PublicPlace>{

    console.log("Create")
    console.log(publicPlace)
    if(publicPlace.pp_geometry != '0'){
      console.log(publicPlace)
      publicPlace.pp_geometry = this.publicPlaceService.preparObject(<LineString>publicPlace.pp_geometry);
      let postSpatial = this.restApiBackend.postData(this.stringConection,publicPlace);
      let a = await firstValueFrom(postSpatial);  
    }    
  
   return new PublicPlace;
  }
  changeData (dataSpatial : PublicPlace): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }



}
