import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { District } from '../../../models/district.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'
import { County } from 'src/app/models/county.model';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Geometry, MultiPolygon } from 'ol/geom';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-maneger-district',
  templateUrl: './maneger-district.component.html',
  styleUrls: ['./maneger-district.component.css']
})
export class ManegerDistrictComponent implements OnInit {

  public cities : County[] = [];
  public district! : District;
  public districtForm!: FormGroup;

  constructor(public districtRepositoryService : DistrictRepositoryService, public countyRepository: CountyRepositoryService, 
    private stateMap :StateMapService, private snackBar: MatSnackBar){ 
    this.district = new District(0);
    stateMap.getFeatureSelect().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.populateGeometry(feature);      
    })
  }

  ngOnInit(): void {
    this.createForm(new District(0));
    this.getCounty();
    this.districtForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
  }

  createForm(district : District):void{
    this.districtForm = new FormGroup({
      nomeDistrict : new FormControl(district.name),
      idDistrict : new FormControl(district.id),
      areaDistrict : new FormControl(district.area),
      geometry: new FormControl(district.geometry),
      selectDraw: new FormControl(district.id_district),//geometry//geometry
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

  getCounty():void{
    let a = {};
    this.countyRepository.findFetch().subscribe((data : County[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.cities = data;
    })
  }   
  

  onSubmit(){
   
    const citySubmit: District = new District(this.district.id_district);
    citySubmit.name = this.districtForm.get('nomeDistrict')?.value;
    citySubmit.area = this.districtForm.get('areaDistrict')?.value;
    citySubmit.dc_geometry = <Geometry>this.district.geometry;
    citySubmit.county = this.district.county;
    
    console.log(citySubmit);
    this.createDistrict(citySubmit);
  }

  createDistrict(district:District):void{
    console.log('popu')
    console.log(district)
    this.districtRepositoryService.createData(district)
    .then((value:District) => {
      console.log(value)
      this.snackBar.open(`Infraestrutura Cadastrada! ID { ${value.id} }`,'Entendido',{duration: 8 * 1000});
    })
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
