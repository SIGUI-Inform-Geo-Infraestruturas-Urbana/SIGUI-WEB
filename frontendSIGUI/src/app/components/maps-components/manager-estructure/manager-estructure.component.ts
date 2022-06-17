import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
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
  public districts : District[] = [];
  public equipament : EquipmentUrban;
  public equipamentForm!: FormGroup;

  constructor( public districtRepository : DistrictRepositoryService,
   public streetRepository: StreetRepositoryService , 
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
    this.getSubsystem();
    this.equipamentForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectOcupante(f)})
    this.equipamentForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectsubsystem(f)})
     
  }

  createForm(infrastructure : EquipmentUrban):void{
    this.equipamentForm = new FormGroup({

      eq_co_cod : new FormControl(infrastructure.eq_co_cod),
      eq_co_equipament : new FormControl(infrastructure.eq_co_equipament),
      eq_co_type :  new FormControl(infrastructure.eq_co_type),
      eq_co_departament_admin :  new FormControl(infrastructure.eq_co_type),
      eq_co_name_complete :  new FormControl(infrastructure.eq_co_name_complete),
      eq_co_first_name :  new FormControl(infrastructure.eq_co_first_name),
      eq_co_name :  new FormControl(infrastructure.eq_co_name),
      eq_co_name_map :  new FormControl(infrastructure.eq_co_name_map),
      eq_co_street : new FormControl(infrastructure.eq_co_street),
      eq_co_number_building :  new FormControl(infrastructure.eq_co_number_building),
      eq_co_district : new FormControl(infrastructure.eq_co_district),
      eq_co_observation :  new FormControl(infrastructure.eq_co_observation),          
      
    });
  }

  populateGeometry(feature:DataSpatial){
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let infrastructure:Infrastructure = <Infrastructure>feature;   
   
    if(infrastructure.infra_geometry != '0'){
      console.log('Teste register');      
      this.equipament.geometry = infrastructure.infra_geometry;
      console.log(this.equipament);
    }
  }

  getSubsystem(){
    this.districtRepository.findFetch().subscribe((data : District[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.districts = data;
    })
  }

  getInfraestructure(){
    this.streetRepository.findFetch().subscribe((data : Street[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.streets = data;
    })
  }

  onSelectOcupante(value:number){
    console.log('select')
    console.log(value)
    this.equipament.eq_co_district = <District> this.districts.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }
  onSelectsubsystem(value:number){
    console.log('select')
    console.log(value)
    this.equipament.eq_co_street = <Street> this.streets.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }

  onSubmit(){
   
    // const infraSubmit: Infrastructure = new Infrastructure(this.equipament.id_infra);
    // infraSubmit.name = this.equipamentForm.get('infraName')?.value;
    // infraSubmit.category = this.equipamentForm.get('infraCategory')?.value;
    // infraSubmit.dependent = infraSubmit.dependent;
    // infraSubmit.subsystems = infraSubmit.subsystems;
    // infraSubmit.infra_geometry = <Geometry>this.equipament.geometry;       
    // console.log(infraSubmit);
    // this.createDistrict(infraSubmit);
  }

  createDistrict(infrastructure:Infrastructure):void{
    // console.log('popu')
    // console.log(infrastructure)
    // this.districtRepository.createData(infrastructure)
  }

}
