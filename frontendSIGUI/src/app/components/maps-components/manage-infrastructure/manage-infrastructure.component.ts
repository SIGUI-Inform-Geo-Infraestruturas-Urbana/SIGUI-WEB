import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { SubsystemRepositoryService } from 'src/app/repositorys/subsystem-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-manage-infrastructure',
  templateUrl: './manage-infrastructure.component.html',
  styleUrls: ['./manage-infrastructure.component.css']
})
export class ManageInfrastructureComponent implements OnInit {
  public infrastructures : Infrastructure[] = [];
  public streets : Street[] = [];  
  public subsystems : Subsystem[] = [];
  public infrastructure! : Infrastructure;
  public infrastrutureForm!: FormGroup;

  constructor( public infrastructureRepository : InfrastructureRepositoryService,
    public subsystemRepositoryService : SubsystemRepositoryService, public streetRepository: StreetRepositoryService , 
    private stateMap :StateMapService) {
    this.infrastructure = new Infrastructure(0);
    // stateMap.getFeatureSelect().subscribe(feature => {
    //   console.log("+++6+iniciou")    
    //   console.log(feature)    
    // //  this.populateGeometry(feature);      
    // })
  }

  ngOnInit(): void {
    // this.createForm(new Infrastructure(0));
    // this.getSubsystem();
    // this.infrastrutureForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectOcupante(f)})
    // this.infrastrutureForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectsubsystem(f)})
     
  }

  createForm(infrastructure : Infrastructure):void{
    this.infrastrutureForm = new FormGroup({
      infraName: new FormControl(infrastructure.name),
      idInfrastructure : new FormControl(infrastructure.id),
      infraCategory : new FormControl(infrastructure.category),
      selectOcupante : new FormControl(infrastructure.dependent),      
      selectSubsystem: new FormControl(infrastructure.subsystems),
          
      
    });
  }

  populateGeometry(feature:DataSpatial){
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let infrastructure:Infrastructure = <Infrastructure>feature;   
   
    if(infrastructure.infra_geometry != '0'){
      console.log('Teste register');      
      this.infrastructure.geometry = infrastructure.infra_geometry;
      console.log(this.infrastructure);
    }
  }

  getSubsystem(){
    this.subsystemRepositoryService.findFetch().subscribe((data : Subsystem[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.subsystems = data;
    })
  }

  onSelectOcupante(value:number){
    console.log('select')
    console.log(value)
    this.infrastructure.dependent = <Infrastructure> this.infrastructures.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.dependent)
  }
  onSelectsubsystem(value:number){
    console.log('select')
    console.log(value)
    this.infrastructure.subsystems = <Subsystem> this.subsystems.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.subsystems)
  }

  onSubmit(){
   
    const infraSubmit: Infrastructure = new Infrastructure(this.infrastructure.id_infra);
    infraSubmit.name = this.infrastrutureForm.get('infraName')?.value;
    infraSubmit.category = this.infrastrutureForm.get('infraCategory')?.value;
    infraSubmit.dependent = infraSubmit.dependent;
    infraSubmit.subsystems = infraSubmit.subsystems;
    infraSubmit.infra_geometry = <Geometry>this.infrastructure.geometry;       
    console.log(infraSubmit);
    this.createDistrict(infraSubmit);
  }

  createDistrict(infrastructure:Infrastructure):void{
    console.log('popu')
    console.log(infrastructure)
    this.infrastructureRepository.createData(infrastructure)
  }
}
