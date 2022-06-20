import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Network } from 'src/app/models/network.model';
import { InfrastructureNetworkRepositoryService } from 'src/app/repositorys/infrastructure-network-repository.service';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { NetworkRepositoryService } from 'src/app/repositorys/network-repository.service';
import { DataAssociationService } from 'src/app/services/count/data-association.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-infrastructure-network',
  templateUrl: './infrastructure-network.component.html',
  styleUrls: ['./infrastructure-network.component.css']
})
export class InfrastructureNetworkComponent implements OnInit , OnChanges{

  @Input() infrastructure!: Infrastructure; 
  @Input() infraAssociation!: InfrastructureNetwork;
  public networks! : Network[]; 
  public labelInfra : string = 'Teste'
  public Associada : string = 'Associada'
  public infrastrutureForm!: FormGroup;
  
  constructor( public networkRepository: NetworkRepositoryService,   
    private dataAssociationService :DataAssociationService,
    private InfrastructureNetworkRepository : InfrastructureNetworkRepositoryService) {
    this.infraAssociation = new InfrastructureNetwork(0);
    
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log('atualiza')
    console.log(changes['infrastructure'].currentValue);
    this.infraAssociation.infrastructure_in = changes['infrastructure'].currentValue;
    this.dataAssociationService.setnfraNet(this.infraAssociation)
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
      console.log('nETWORKS')
      console.log(data[0])
      this.networks = data;
      console.log('END')
    })
  }

  createForm(infraNet : InfrastructureNetwork):void{
    this.infrastrutureForm = new FormGroup({
      id_network: new FormControl(infraNet.id_network),
      serial_number : new FormControl(infraNet.serial_number),
      status : new FormControl(infraNet.status),
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
   
    const infraSubmit: InfrastructureNetwork = new InfrastructureNetwork(this.infraAssociation.id);
    infraSubmit.serial_number = this.infrastrutureForm.get('serial_number')?.value;
    infraSubmit.status = this.infrastrutureForm.get('status')?.value;
    infraSubmit.infrastructure_in = this.infraAssociation.infrastructure_in;
    infraSubmit.infrastructure_out = this.infraAssociation.infrastructure_out;
    infraSubmit.network = this.infraAssociation.network;
    infraSubmit.infra_geometry = <Geometry>this.infraAssociation.infra_geometry;     
    console.log('sdaa');
    console.log(infraSubmit);
    this.createDistrict(infraSubmit);
  }

  createDistrict(network:InfrastructureNetwork):void{
    console.log('popu')
    console.log(network)
    this.InfrastructureNetworkRepository.createData(network)
  }

}
