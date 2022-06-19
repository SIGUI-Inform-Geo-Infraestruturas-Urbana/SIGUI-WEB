import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { Street } from 'src/app/models/street.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-manager-street',
  templateUrl: './manager-street.component.html',
  styleUrls: ['./manager-street.component.css']
})
export class ManagerStreetComponent implements OnInit {

  public districts : District[] = [];
  public street : Street;
  public streetForm!: FormGroup;

  constructor(public streetRepository: StreetRepositoryService,public districtRepository : DistrictRepositoryService, 
    private stateMap :StateMapService) {
      this.street = new Street();
      stateMap.getFeatureSelect().subscribe(feature => {
        console.log("+++6+iniciou")    
        console.log(feature)    
        this.populateGeometry(feature);      
      })
  }

  ngOnInit(): void {
    this.createForm(new Street(0));
    this.getDistrict();
    this.streetForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectDistrictE(f)})
    this.streetForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectDistrictD(f)})
    this.streetForm.get("selectDistrict")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
  } 

  createForm(street : Street):void{
    this.streetForm = new FormGroup({
      nameStreet : new FormControl(street.name_street),
      nameStreetPre : new FormControl(street.name_street_pre),
      idStreet : new FormControl(street.id),      
      codKey: new FormControl(street.cod_key),
      typeStreet: new FormControl(street.type_street),
      typeLegislation: new FormControl(street.type_legislation),
      selectDistrictE: new FormControl(1),//street.district_e
      selectDistrictD: new FormControl(1),//street.district_d
      zipCodeE: new FormControl(street.zip_code_e),
      zipCodeD: new FormControl(street.zip_code_d),
      selectDistrict: new FormControl(street.district),//geometry//geometry      
      geometry: new FormControl(street.st_geometry),//geometry//geometry
    });
  }

  onSubmit(){
   
    const streetSubmit: Street = new Street(this.street.id_street);
    streetSubmit.name_street = this.streetForm.get('nameStreet')?.value;
    streetSubmit.name_street_pre = this.streetForm.get('nameStreetPre')?.value;
    streetSubmit.cod_key = this.streetForm.get('codKey')?.value;
    streetSubmit.type_street = this.streetForm.get('typeStreet')?.value;
    streetSubmit.type_legislation = this.streetForm.get('typeLegislation')?.value;
    streetSubmit.district = this.street.district
    streetSubmit.district_e = this.street.district_e
    streetSubmit.district_d = this.street.district_d
    streetSubmit.zip_code_e = this.streetForm.get('zipCodeE')?.value;
    streetSubmit.zip_code_d = this.streetForm.get('zipCodeD')?.value;
    streetSubmit.st_geometry = <Geometry>this.street.geometry;   
    
    console.log(streetSubmit);
    this.createDistrict(streetSubmit);
  }

  createDistrict(street:Street):void{
    console.log('popu')
    console.log(street)
    this.streetRepository.createData(street)
  }

  getDistrict(){
    this.districtRepository.findFetch().subscribe((data : District[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.districts = data;
    })
  }

  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let street:Street = <Street>feature;   
   
    if(street.st_geometry != '0'){
      console.log('Teste register');      
      this.street.geometry = street.st_geometry;
      console.log(this.street);
    }
  }

  onSelectDistrictE(value:number){
    console.log('select')
    console.log(value)
    this.street.district_e = <string> this.districts.find( a => a.id == value)?.name
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
  onSelectDistrictD(value:number){
    console.log('select')
    console.log(value)
    this.street.district_d = <string> this.districts.find( a => a.id == value)?.name
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
  onSelectDistrict(value:number){
    console.log('select')
    console.log(value)
    this.street.district = <District> this.districts.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
}
