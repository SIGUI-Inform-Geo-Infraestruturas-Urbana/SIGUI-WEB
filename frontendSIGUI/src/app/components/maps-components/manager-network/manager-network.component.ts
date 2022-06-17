import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Network } from 'src/app/models/network.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { NetworkRepositoryService } from 'src/app/repositorys/network-repository.service';
import { SubsystemRepositoryService } from 'src/app/repositorys/subsystem-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-manager-network',
  templateUrl: './manager-network.component.html',
  styleUrls: ['./manager-network.component.css']
})
export class ManagerNetworkComponent implements OnInit {
  
  public subsystems : Subsystem[] = [];
  public network : Network;
  public networkForm!: FormGroup;

  constructor( public networkRepositoryService : NetworkRepositoryService,
    public subsystemRepositoryService : SubsystemRepositoryService) {
    this.network = new Network(0);
  }

  ngOnInit(): void {
    this.createForm(new Network(0));
    this.getSubsystem();
    this.networkForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectsubsystem(f)})
  
  }

  createForm(network : Network):void{
    this.networkForm = new FormGroup({
      name: new FormControl(network.name),
      idNetwork : new FormControl(network.id),
      selectCategory : new FormControl(network.category),
      selectstatus : new FormControl(network.status),      
      selectSubsystem: new FormControl(network.subsystems),      
      
    });
  }

  getSubsystem(){
    this.subsystemRepositoryService.findFetch().subscribe((data : Subsystem[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.subsystems = data;
    })
  }

  onSelectsubsystem(value:number){
    console.log('select')
    console.log(value)
    this.network.subsystems = <Subsystem> this.subsystems.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.network.subsystems)
  }

  onSubmit(){
   
    const network: Network = new Network(this.network.id_network);
    network.name = this.networkForm.get('name')?.value;
    network.category = this.networkForm.get('selectCategory')?.value;
    network.status = this.networkForm.get('selectstatus')?.value;
    network.subsystems = network.subsystems;
    
    console.log(network);
    this.createDistrict(network);
  }

  createDistrict(network:Network):void{
    console.log('popu')
    console.log(network)
    this.networkRepositoryService.createData(network)
  }

}
