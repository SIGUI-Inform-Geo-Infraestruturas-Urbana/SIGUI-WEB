import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { BehaviorSubject, firstValueFrom, Observable, Observer } from 'rxjs';
import { FileData } from '../models/file-data.model';
import { UnitFederal } from '../models/unit-federal.model';
import { DataSpatialService } from '../services/count/data-spatials.service';
import { RestApiBackendService } from './rest-api-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ShapefilesRepositoryService {

  private readonly _units= new BehaviorSubject<FileData[]>([]);
  readonly units$: Observable<FileData[]> = this._units.asObservable();
  private stringConection = 'api/data/uploads';

  constructor(private restApiBackend: RestApiBackendService<FormData,string>) 
  { }  

  findFetch(stringParam : string , idParam : number = 0):Observable<FileData[]>{//Feature<Geometry>
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = this.stringConection +stringParam+ idParam.toString();
    }
    else
    {
      urlSearch = this.stringConection +stringParam;
    }

    this.restApiBackend.getData(urlSearch)
    //.pipe(catchError(()=> { return  throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (response : HttpResponse<string>) => {
        console.log(response)
        // this._units.next(streets);
      },
      error: (err) => {
        console.log(err);
        this._units.error(err);
      },
    });
    return  this.units$;
  }

  postData (stringParam : string , street:FormData):Observable<FileData>{

    return new Observable((observer: Observer<FileData>) => {
      console.log("Create")
      this.restApiBackend.postDataSimple('',street).subscribe((data : {}) => {
        console.log('populate')
        console.log(data)
        //this.snackBar.open(`Estados Cadastrados! }`,'Entendido',{duration: 8 * 1000});
      })
    //   console.log(street)
    //     this.restApiBackend.postData(this.stringConection,street).subscribe({
    //     next: (response : HttpResponse<string>) => {
    //     console.log(response);
    //     // let featureObject : Feature<Geometry> = this.streetService.conversionJsonObject(<string>response.body); 
    //     // let infras = new Street().deserialize(featureObject)
    //     // console.log('cRIAdo')
    //     // observer.next(infras);
    //     // observer.complete();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       observer.error(err);
    //     },
    //  }); 
     }); 
   }  
  changeData (dataSpatial : UnitFederal): boolean{
    return false;
  }
  deleteData (idParam : number ): boolean {
    return false;
  }
}
