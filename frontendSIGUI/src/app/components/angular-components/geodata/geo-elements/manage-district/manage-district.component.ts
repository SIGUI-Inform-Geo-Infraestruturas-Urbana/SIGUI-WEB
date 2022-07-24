import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { District } from '../../../../../models/district.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../../../services/rest-api.service';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../../../services/shared/state-map.service'
import { County } from 'src/app/models/county.model';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Geometry, MultiPolygon, Polygon } from 'ol/geom';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import { MatSnackBar} from '@angular/material/snack-bar'
import { DistrictManipulationService } from 'src/app/services/district/district-manager/district-manipulation.service';
import { getArea } from 'ol/sphere';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-district',
  templateUrl: './manage-district.component.html',
  styleUrls: ['./manage-district.component.scss']
})
export class ManageDistrictComponent implements OnInit {

  public cities : County[] = [];
  public district! : District;
  public districtForm!: FormGroup;
  public editable : boolean = false;
  public saving : boolean = true;

  constructor(public districtRepositoryService : DistrictRepositoryService,
    public countyRepository: CountyRepositoryService,
    private districtManipulation :DistrictManipulationService,   
    private stateMap :StateMapService, private snackBar: MatSnackBar){ 
    this.district = new District();
    this.createForm(new District(0));
    districtManipulation.getDistrictManipulation().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.initializeForm(feature);      
      //this.populateGeometry(feature);      
    })
  }

  ngOnInit(): void {
 
    this.getCounty();
    this.districtForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
  }

  initializeForm(district:District ){//feature:DataSpatial
    //let city:County = <County>feature;   
    if ((district.id_district != undefined)&&(district.id_district != 0)){
      console.log(district.id_district)
      console.log('Valor já existe')
      console.log(district)
      this.updateForm(district);
      this.district = district;    
      this.editable = true;
      this.saving = false;
    }
    else
    {
      console.log('Definir nova variavel')
      this.populateGeometry(district); 
      this.updateForm(district);      
      this.editable = false;
      this.saving = true; 
    }
  }

  updateForm(district : District){
    console.log('updateForm')
    console.log(district)
    
    this.districtForm.patchValue({
      nomeDistrict : district.name,
      idDistrict :district.id_district,      
      areaDistrict:  this.generateArea(district),
      selectDraw: district.id_district,
    })
  }

  createForm(district : District):void{
    this.districtForm = new FormGroup({
      //      codigoAmbiental: new FormControl({ value: city.cod_environmental },[Validators.required]),
      nomeDistrict: new FormControl(district.name ,[Validators.required]),
      idDistrict : new FormControl({ value: district.id , disabled : true}),
      areaDistrict : new FormControl({ value: district.area, disabled : true}),// new FormControl(district.area ),
      geometry: new FormControl( district.geometry ),
      selectDraw: new FormControl({ value: district.id },[Validators.required]),//geometry//geometry
    });
    
  }
 
  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let distric:District = <District>feature;   
   
    if(distric.dc_geometry != '0'){
      console.log('Teste register');      
      this.district.geometry = distric.dc_geometry;
      console.log(  this.district.geometry);
    }
  }

  generateArea(district:District):number{  
    if(district.geometry != '0'){  
      const area = getArea(<Polygon>district.geometry);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 //+ ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 //+ ' ' + 'm<sup>2</sup>';
      }
      console.log(output);
      return output;
    }
    else{
      return 0;
    }
  } 

  getCounty():void{
    let a = {};
    // this.countyRepository.findFetch().subscribe((data : County[])=>{
    //   console.log('getcounty')
    //   this.cities = data;
    // })
    this.countyRepository.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : County[]) => {
        console.log('getcounty')
        console.log(data);
        this.cities = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }   
  

  onSubmit(){

    if (this.districtForm.valid)
    {
      if((this.district.geometry != '0')&&(this.district.geometry != undefined))
      {      
        const citySubmit: District = new District(this.district.id_district);
        citySubmit.name = this.districtForm.get('nomeDistrict')?.value;
        citySubmit.area = this.districtForm.get('areaDistrict')?.value;
        citySubmit.dc_geometry = <Geometry>this.district.geometry;
        citySubmit.county = this.district.county;
        
        console.log(citySubmit);
        if (this.saving == true){
          this.createDistrict(citySubmit);
        }
        else if (this.editable == true){
          console.log('Não Geomtria')
          citySubmit.id = this.districtForm.get('idDistrict')?.value;
          this.alterData(citySubmit);
        }
      }
      else {
        console.log('Não Geomtria')
      }
    }
    else
    {
      console.log('Não Validado')
    }
  }

   createDistrict(district:District):void{
    console.log('popu')
    console.log(district)

    this.districtRepositoryService.postData(district).subscribe({
      next: (districts : District) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Distrito Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
      
      },
    
    })
  }

  alterData(district:District):void{
    console.log('popu')
    console.log(district)

    this.districtRepositoryService.editData(district).subscribe({
      next: (districts : District) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Cidade Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);      
      },
    
    })
  }

  openSnackBar(mensagem : string) {
    this.snackBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
 
  onSelectDistrict(value:number):void{
    console.log('select')
    console.log(value)
    this.district.county =<number> this.cities.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.district.county)
  }  

  // onSelectDistrict(value:number):void{
  //   console.log(value)
  //   for (let city of this.cities) {
  //     if(city.id_county == value){
  //       this.district.id_County = city;
  //       console.log(this.district.id_County);
  //       break;
  //     }
  //   }
  // } 
}
