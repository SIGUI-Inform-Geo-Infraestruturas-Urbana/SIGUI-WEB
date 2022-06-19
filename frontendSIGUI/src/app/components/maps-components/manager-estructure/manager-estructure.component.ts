import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { EquipamentUrbanRepositoryService } from 'src/app/repositorys/equipament-urban-repository.service';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { PublicPlaceRepositoryService } from 'src/app/repositorys/public-place-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { SubsystemRepositoryService } from 'src/app/repositorys/subsystem-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-manager-infrastructure',
  templateUrl: './manager-estructure.component.html',
  styleUrls: ['./manager-estructure.component.css']
})
export class ManagerEstructureComponent implements OnInit {

  public streets : Street[] = [];  
  public publicPlaces : PublicPlace[] = [];  
  public districts : District[] = [];
  public equipament : EquipmentUrban;
  public equipamentForm!: FormGroup;

  constructor( public districtRepository : DistrictRepositoryService,
   public streetRepository: StreetRepositoryService , 
   public publicPlaceRepository: PublicPlaceRepositoryService , 
   public EquipamentUrbanRepository: EquipamentUrbanRepositoryService , 
    private stateMap :StateMapService) {
    this.equipament = new EquipmentUrban(0);
    stateMap.getFeatureSelect().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.populateGeometry(feature);      
    })
  }

  ngOnInit(): void {
    this.createForm(new EquipmentUrban(0));
    this.getDistrict();
    this.getStreet();
    this.getPublicPlace();
    this.equipamentForm.get("eq_co_street")?.valueChanges.subscribe(f => {this.onSelectStreet(f)})
    this.equipamentForm.get("eq_co_district")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
    this.equipamentForm.get("eq_co_public_place")?.valueChanges.subscribe(f => {this.onSelectPP(f)})
     
  }

  createForm(infrastructure : EquipmentUrban):void{
    this.equipamentForm = new FormGroup({

      eq_co_cod : new FormControl(infrastructure.co_cod),
      eq_co_equipament : new FormControl(infrastructure.co_equipament),
      eq_co_type :  new FormControl(infrastructure.co_type),
      eq_co_departament_admin :  new FormControl(infrastructure.co_type),
      eq_co_name_complete :  new FormControl(infrastructure.co_name_complete),
      eq_co_first_name :  new FormControl(infrastructure.co_first_name),
      eq_co_name :  new FormControl(infrastructure.name),
      eq_co_name_map :  new FormControl(infrastructure.co_name_map),
      eq_co_street : new FormControl(infrastructure.co_street),
      eq_co_public_place : new FormControl(infrastructure.co_public_place),
      eq_co_number_building :  new FormControl(infrastructure.co_number_building),
      eq_co_district : new FormControl(infrastructure.co_district),
      eq_co_observation :  new FormControl(infrastructure.observation),          
      
    });
  }

  populateGeometry(feature:DataSpatial){
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let infrastructure:EquipmentUrban = <EquipmentUrban>feature;   
   
    if(infrastructure.co_geometry != '0'){
      console.log('Teste register');      
      this.equipament.geometry = infrastructure.co_geometry;
      console.log(this.equipament);
    }
  }

  getDistrict(){
    this.districtRepository.findFetch().subscribe((data : District[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.districts = data;
    })
  }

  getStreet(){
    this.streetRepository.findFetch().subscribe((data : Street[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.streets = data;
    })
  }
  getPublicPlace(){
    this.publicPlaceRepository.findFetch().subscribe((data : PublicPlace[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.publicPlaces = data;
    })
  }

  onSelectDistrict(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_district = <District> this.districts.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }
  onSelectPP(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_public_place = <PublicPlace> this.publicPlaces.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }
  onSelectStreet(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_street = <Street> this.streets.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }

  onSubmit(){

    const equipamentUrbanSubmit: EquipmentUrban = new EquipmentUrban(this.equipament.id);

    equipamentUrbanSubmit.co_cod = this.equipamentForm.get('eq_co_cod')?.value;
    equipamentUrbanSubmit.co_equipament = this.equipamentForm.get('eq_co_equipament')?.value;
    equipamentUrbanSubmit.co_type = this.equipamentForm.get('eq_co_type')?.value;
    equipamentUrbanSubmit.co_departament_admin = this.equipamentForm.get('eq_co_departament_admin')?.value;
    equipamentUrbanSubmit.co_name_complete = this.equipamentForm.get('eq_co_name_complete')?.value;
    equipamentUrbanSubmit.co_first_name = this.equipamentForm.get('eq_co_first_name')?.value;
    equipamentUrbanSubmit.name = this.equipamentForm.get('eq_co_name')?.value;
    equipamentUrbanSubmit.co_name_map = this.equipamentForm.get('eq_co_name_map')?.value;
    equipamentUrbanSubmit.co_street = this.equipament.co_street;
    equipamentUrbanSubmit.co_public_place = this.equipament.co_public_place;
    equipamentUrbanSubmit.co_number_building = this.equipamentForm.get('eq_co_number_building')?.value;
    equipamentUrbanSubmit.co_district = this.equipament.co_district;
    equipamentUrbanSubmit.observation = this.equipamentForm.get('eq_co_observation')?.value;
    equipamentUrbanSubmit.geometry = <Geometry>this.equipament.geometry;     

    console.log(equipamentUrbanSubmit);
    this.createPublicPlace(equipamentUrbanSubmit);
  
   
    // const infraSubmit: Infrastructure = new Infrastructure(this.equipament.id_infra);
    // infraSubmit.name = this.equipamentForm.get('infraName')?.value;
    // infraSubmit.category = this.equipamentForm.get('infraCategory')?.value;
    // infraSubmit.dependent = infraSubmit.dependent;
    // infraSubmit.subsystems = infraSubmit.subsystems;
    // infraSubmit.infra_geometry = <Geometry>this.equipament.geometry;       
    // console.log(infraSubmit);
    // this.createDistrict(infraSubmit);
  }

  createPublicPlace(equi:EquipmentUrban):void{
    console.log('popu')
    console.log(equi)
    this.EquipamentUrbanRepository.createData(equi)
  }

}
