import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataSpatial } from 'src/app/models/data-spatial';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Network } from 'src/app/models/network.model';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { NetworkRepositoryService } from 'src/app/repositorys/network-repository.service';
import { DataAssociationService } from 'src/app/services/count/data-association.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-infrastructure-network',
  templateUrl: './infrastructure-network.component.html',
  styleUrls: ['./infrastructure-network.component.css']
})
export class InfrastructureNetworkComponent implements OnInit {

  @Input() infrastructure!: Infrastructure; 
  @Input() infraAssociation!: InfrastructureNetwork;
  public networks! : Network[]; 
  public labelInfra : string = 'Teste'
  public Associada : string = 'Associada'
  public infrastrutureForm!: FormGroup;
  
  constructor( public networkRepository: NetworkRepositoryService,   
    private dataAssociationService :DataAssociationService) {
    //this.infrastructure = new Infrastructure(0);
    dataAssociationService.setnfraNet(this.infraAssociation)
    dataAssociationService.getDataSpatial().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.populateGeometry(feature);      
    })
   
  }

  ngOnInit(): void {
    this.createForm(new InfrastructureNetwork(0));
    this.getNetwork();
    this.infrastrutureForm.get("selectNetwork")?.valueChanges.subscribe(f => {this.onSelectNetwork(f)})
  }

  onSelectNetwork(value:number){
    console.log('select')
    console.log(value)
    this.infraAssociation.network = <Network> this.networks.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.dependent)
  }

  getNetwork(){
    this.networkRepository.findFetch().subscribe((data : Network[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.networks = data;
    })
  }

  createForm(infraNet : InfrastructureNetwork):void{
    this.infrastrutureForm = new FormGroup({
      id_network: new FormControl(infraNet.id_network),
      serial_number : new FormControl(infraNet.serial_number),
      infrastructure_in : new FormControl(infraNet.infrastructure_in),
      infrastructure_out : new FormControl(infraNet.infrastructure_out),      
      selectNetwork: new FormControl(infraNet.network),        
      
    });
  }

  populateGeometry(feature:DataSpatial){
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let infras:InfrastructureNetwork = <InfrastructureNetwork>feature;   
   
    if(infras.infra_geometry != '0'){
      console.log('Teste register');      
      this.infraAssociation.infrastructure_out = infras.infrastructure_out
      this.infraAssociation.geometry = infras.infra_geometry;
      console.log(this.infrastructure);
    }
  }

  onSubmit(){
   
    // const infraSubmit: InfrastructureNetwork = new InfrastructureNetwork(this.infrastructure.id_infra);
    // infraSubmit.serial_number = this.infrastrutureForm.get('serial_number')?.value;
    // infraSubmit.infrastructure_in = this.infrastructure;
    // infraSubmit.infrastructure_out = this.infrastructure.dependent;
    // infraSubmit.selectNetwork = this.infrastructure.subsystems;
    // infraSubmit.infra_geometry = <Geometry>this.infrastructure.geometry;       
    // console.log('sdaa');
    // console.log(infraSubmit.subsystems);
    // this.createDistrict(infraSubmit);
  }

}
